const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contacts API",
        description: "API for managing contacts",
    },
    host: "project1-ht4k.onrender.com",
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);