import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPartnerSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Partner registration endpoint
  app.post("/api/partners", async (req, res) => {
    try {
      // Validate the request body
      const result = insertPartnerSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          message: "Validation error", 
          errors: validationError.details 
        });
      }
      
      // Store platforms as a JSON string since we're using a simple storage
      const { agreement, ...validData } = result.data;
      const partnerData = {
        ...validData,
        platforms: JSON.stringify(validData.platforms),
        createdAt: new Date().toISOString(),
        website: validData.website || null,
      };
      
      // Save to storage
      const partner = await storage.createPartner(partnerData);
      
      return res.status(201).json({
        message: "Partner registration successful",
        data: partner
      });
    } catch (error) {
      console.error("Error creating partner:", error);
      return res.status(500).json({ 
        message: "Internal server error"
      });
    }
  });

  // Get all partners (for admin purposes)
  app.get("/api/partners", async (req, res) => {
    try {
      const partners = await storage.getAllPartners();
      return res.status(200).json(partners);
    } catch (error) {
      console.error("Error fetching partners:", error);
      return res.status(500).json({ 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
