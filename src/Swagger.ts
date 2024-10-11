const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Pizzaria API',
      description: 'Pizzaria API',
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.ts');
});