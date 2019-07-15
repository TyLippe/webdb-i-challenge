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

//GET ALL (WORKING)
router.get('/', (req, res) => {
    dbConnector('accounts')
    .then(account => {
        res.status(200).json(account);
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

//GET BY ID(WORKING)
router.get('/:id', (req, res) => {
    dbConnector('accounts')
        .where({ id: req.params.id })
        .first()
        .then(account => {
            if (account) {
                res.status(200).json(account);
            } else {
                res.status(400).json({ message: 'not found'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//ADD AN ACCOUNT (WORKING)
router.post('/', (req, res) => {
    const account = req.body;

    dbConnector('accounts')
        .insert(account, 'id')
        .then(arrayOfIds => {
            const idOfLast = arrayOfIds[0];

            res.status(201).json(idOfLast);
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//UPDATE AN ACCOUNT (WORKING)
router.put('/:id', (req, res) => {
    dbConnector('accounts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} record(s) updated` })
            } else {
                res.status(404).json({ message: 'not found' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

//DELETE ACCOUNT (WORKING)
router.delete('/:id', (req, res) => {
    dbConnector('accounts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            res.status(200).json({ message: `${count} record(s) deleted.` })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;