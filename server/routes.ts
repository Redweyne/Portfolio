import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          error: "Failed to submit message",
        });
      }
    }
  });

  app.get("/api/contact", async (_req, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json({ success: true, messages });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to fetch messages",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
