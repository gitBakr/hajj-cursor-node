const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Hajj & Omra',
      version: '1.0.0',
      description: 'Documentation API pour l\'application Hajj & Omra',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Serveur de développement',
      },
    ],
  },
  apis: [
    'models/*.js',
    'routes/*.js'
  ],
};

module.exports = swaggerJsdoc(options); 