const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket Booking System API",
      version: "1.0.0",
      description: "API documentation for the Ticket Booking System",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };