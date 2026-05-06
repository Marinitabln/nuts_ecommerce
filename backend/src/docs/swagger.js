import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nuts API - Dietética",
      version: "1.0.0",
      description: "API para gestión de productos de dietética",
    },
    servers: [
      {
        url: "http://localhost:3000",
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
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string", example: "1" },
            name: { type: "string", example: "Avena instantánea" },
            description: { type: "string" },
            imageUrl: { type: "string" },
            category: { type: "string", example: "cereales" },
            presentations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  label: { type: "string", example: "1kg" },
                  price: { type: "number", example: 3000 },
                },
              },
            },
          },
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", example: "admin@test.com" },
            password: { type: "string", example: "123456" },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: { type: "string" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);