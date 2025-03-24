import { users, type User, type InsertUser, type Partner, partners } from "@shared/schema";

// Extend the storage interface with CRUD methods for partners
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Partner methods
  createPartner(partner: Omit<Partner, "id">): Promise<Partner>;
  getAllPartners(): Promise<Partner[]>;
  getPartner(id: number): Promise<Partner | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private partners: Map<number, Partner>;
  private userCurrentId: number;
  private partnerCurrentId: number;

  constructor() {
    this.users = new Map();
    this.partners = new Map();
    this.userCurrentId = 1;
    this.partnerCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Partner methods
  async createPartner(partnerData: Omit<Partner, "id">): Promise<Partner> {
    const id = this.partnerCurrentId++;
    const partner: Partner = { ...partnerData, id };
    this.partners.set(id, partner);
    return partner;
  }
  
  async getAllPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values());
  }
  
  async getPartner(id: number): Promise<Partner | undefined> {
    return this.partners.get(id);
  }
}

export const storage = new MemStorage();
