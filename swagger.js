const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Project 2 API',
    description: 'API for managing Managers and Employees',
  },

  host: 'project2-api-lkcr.onrender.com',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],

  servers: [
    {
      url: "https://project2-api-lkcr.onrender.com",
      description: "Production server"
    }
  ],

  components: {
    securitySchemes: {
      SessionAuth: {
        type: "apiKey",
        in: "cookie",
        name: "connect.sid"
      }
    }
  },

  security: [
    {
      SessionAuth: []
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
