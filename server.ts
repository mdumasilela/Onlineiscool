
/**
 * ONLINE S'COOL - PRODUCTION BACKEND (Node.js/Express)
 * This file represents the server code. 
 * In a real environment, you would run this using 'node server.js'
 */

// NOTE: In a real environment, you'd use 'import express from "express"'
// For this environment, we are defining the logic you would use.

const PORT = 3001;
const ADMIN_SECRET = 'admin167431'; // Matches your portal access code

/**
 * DATABASE SCHEMA (Conceptual - PostgreSQL)
 * table leads {
 *   id: uuid primary_key
 *   parentName: string
 *   studentName: string
 *   email: string
 *   phone: string
 *   grade: string
 *   package: string
 *   status: string
 *   createdAt: timestamp
 * }
 */

// Mock Database Controller (Replace with Prisma/Mongoose in production)
const db = {
  leads: [] as any[],
  
  async findMany() {
    return this.leads.sort((a, b) => b.createdAt - a.createdAt);
  },
  
  async create(data: any) {
    const entry = { ...data, id: Math.random().toString(36).substr(2, 9), createdAt: new Date() };
    this.leads.push(entry);
    return entry;
  },
  
  async update(id: string, data: any) {
    const index = this.leads.findIndex(l => l.id === id);
    if (index !== -1) {
      this.leads[index] = { ...this.leads[index], ...data };
      return this.leads[index];
    }
    return null;
  }
};

/**
 * EXPRESS API ENDPOINTS
 */

// 1. GET /api/leads - Protected
// Returns all leads from the database
const getLeads = async (req: any, res: any) => {
  if (req.headers['x-admin-key'] !== ADMIN_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const leads = await db.findMany();
  res.json(leads);
};

// 2. POST /api/leads - Public
// Called by the website contact form
const postLead = async (req: any, res: any) => {
  const { parentName, studentName, email, phone, grade, package: pkg } = req.body;
  
  if (!email || !studentName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newLead = await db.create({
    parentName, studentName, email, phone, grade, package: pkg, status: 'New'
  });

  res.status(201).json(newLead);
};

// 3. PATCH /api/leads/:id - Protected
// Updates lead status from the Back Office
const updateLead = async (req: any, res: any) => {
  if (req.headers['x-admin-key'] !== ADMIN_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  const { id } = req.params;
  const { status } = req.body;
  
  const updated = await db.update(id, { status });
  res.json(updated);
};

console.log(`ONLINE S'COOL Server listening on port ${PORT}`);
