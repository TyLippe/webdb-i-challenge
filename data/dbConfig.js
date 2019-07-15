const express = require('express');
const knex = require('knex');

const dbConnector = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/budget.db3'
    },
    useNullAsDefault: true
})

const router = express.Router();

router.get('/', (req, res) => {
    dbConnector('budget')
    .then(budget => {
        res.status(200).json(budget);
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})

module.exports = router;