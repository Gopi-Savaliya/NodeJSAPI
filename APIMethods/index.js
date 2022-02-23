const express = require('express');
const dbConnection = require('./dbConnection');
const mongodb = require('mongodb');
const app = express();

// GET API Method
app.get('/', async (req, res) => {
    let db = await dbConnection();
    let data = await db.find().toArray();
    res.send(data);
});

//POST API Method
app.use(express.json());

app.post('/', async (req, res) => {
    let db = await dbConnection();
    let data = await db.insertOne(req.body);
    res.send(data);
});

//PUT API Method
app.put('/:name', async (req, res) => {
    let db = await dbConnection();
    let data = await db.updateOne(
        { name: req.params.name },
        { $set: req.body }
    );
    res.send(data);
});

//DELETE API Method
app.delete('/:id', async (req, res) => {
    let db = await dbConnection();
    let data = await db.deleteOne(
        { _id: new mongodb.ObjectId(req.params.id) }
    );
    res.send(data);
});

app.listen(4500);
