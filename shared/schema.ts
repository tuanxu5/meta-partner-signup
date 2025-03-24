import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  businessType: text("business_type").notNull(),
  fullName: text("full_name").notNull(),
  jobTitle: text("job_title").notNull(),
  email: text("email").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  country: text("country").notNull(),
  website: text("website"),
  metaExperience: text("meta_experience").notNull(),
  platforms: text("platforms").notNull(), // Stored as JSON string
  interest: text("interest").notNull(),
  createdAt: text("created_at").notNull(), // Will store Date as ISO string
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPartnerSchema = createInsertSchema(partners).omit({
  id: true,
  createdAt: true,
}).extend({
  companyName: z.string().default("N/A"), // Made optional with default
  businessType: z.string().default("other"), // Made optional with default
  jobTitle: z.string().default("N/A"), // Made optional with default
  platforms: z.array(z.string()).min(1, "Please select at least one platform"),
  email: z.string().email("Please enter a valid email address"),
  whatsappNumber: z.string().regex(/^\+?[0-9]{8,15}$/, "Please enter a valid WhatsApp number with country code"),
  website: z.string().default("N/A"), // Made optional with default
  agreement: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" })
  })
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partners.$inferSelect;
