// src/interfaces/docs/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API Docs",
    version: "1.0.0",
    description: "API documentation for my backend app",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "./src/presentation/routes/*.js", // Adjust path to where your route files are
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
