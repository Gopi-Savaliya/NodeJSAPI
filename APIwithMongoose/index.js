const express = require('express');
require('./connection');
const mongoose = require('mongoose');
const productModel = require('./productModel');

const app = express();

app.use(express.json());
app.post('/', async (req, res) => {
    let data = new productModel(req.body);
    let result = await data.save();
    res.send(result);
});

app.get('/', async (req, res) => {
    let data = await productModel.find();
    res.send(data);
});

app.put('/:name', async (req, res) => {
    let data = await productModel.updateOne(
        { name: req.params.name },
        { $set: req.body }
    );
    res.send(data);
});

app.delete('/:_id', async (req, res) => {
    let data = await productModel.deleteOne(req.params);
    res.send(data);
});

// Search 
app.get('/search/:name', async (req, res) => {
    let data = await productModel.find({
        "$or": [
            {"name": {$regex:req.params.name}}
        ]
    });
    res.send(data);
});

app.listen(4500);