const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Pizzaria API',
        description: 'Pizzaria API Description',
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = [];

swaggerAutogen()(outputFile, endpointsFiles, doc);