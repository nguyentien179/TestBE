// src/interfaces/middleware/errorHandler.js
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Zod validation error
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Validation failed",
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // Prisma error (e.g., constraint, not found)
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res
      .status(400)
      .json({ error: "Database error", details: err.message });
  }

  // General error
  res.status(500).json({ error: "Internal Server Error" });
};
