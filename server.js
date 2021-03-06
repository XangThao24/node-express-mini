const express = require('express');
const cors = require('cors');
const db = require('./data/db');
const port = 5000;
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello from express');
});

server.post(`/api/users`, (req, res) => {
    const { name, bio } = req.body;
    db
    .insert({ name, bio })
    .then(response => {
        console.log(response);
        res.send(response);
    })
    .catch(error => {
        res.json(error);
    });
});

server.get(`/api/users`, (req, res) => {
    db
    .find().then(users => {
        res.json({ users })
    })
    .catch(error => {
        res.json({ error });
    })
});

server.get(`/api/users/:id`, (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    db
    .findById(id)
    .then(user => {
        res.json(user[0])
    })
    .catch(error => {
        res.json({ error });
    })
});

server.delete(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    db
    .remove(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({ error });
    })
});

server.put(`/api/users/:id`, (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    db
    .update(id, { name, bio })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json({ error });
    })
});



server.listen(port, () => console.log(`Server running on port ${port}`));