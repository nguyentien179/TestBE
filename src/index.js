// main.js
import express from "express";
import dotenv from "dotenv";
import articleRoutes from "./src/interfaces/routes/articleRoutes.js";
import { errorHandler } from "./src/interfaces/middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/api", routes);

// Global Error Handler
app.use(errorHandler);

// Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
