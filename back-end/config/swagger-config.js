const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
  openapi: '3.0.0', 
  info: {
    title: 'User Management API', 
    version: '1.0.0', 
    description: 'API for managing users', 
  },
  servers: [
    {
      url: 'http://localhost:4000/', 
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [], 
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controller/*.js'], 
};


const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};