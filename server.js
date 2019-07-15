const express = require('express');

const BudgetRouter = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/budget', BudgetRouter);

server.get('/', (req, res) => {
    res.send('<h3>KNEX challenge July 15!</h3>');
});

module.exports = server;