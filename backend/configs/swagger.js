// configs/swagger.js
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Fitcify API', version: '1.0.0' },
    servers: [{ url: 'http://localhost:5000' }],   // match the port your app really runs on
  },

  apis: [
    path.join(__dirname, '..', 'routes', '**', '*.js'),          // any router that still has inline docs
    path.join(__dirname, '..', 'docs', '**', '*.swagger.js'),    // your JSDoc–only files
  ],
};

module.exports = swaggerJsdoc(options);
