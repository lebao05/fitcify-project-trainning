const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5000", // ✅ must be HTTP or HTTPS
      },
    ],
  },
  apis: ["./routes/*.js"], // adjust this to your route paths
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
