/*
fruits.js: This file contains the various HTTP route handlers which allow for the adding, updating, deleting,
and accessing of 'fruit' objects. The array 'fruits' is the main data source. 
*/

const express = require('express');

// Require in the utilities module
const utils = require('../utils/utils.js');

const fruits = [
    {id: 1, name: "Apple", color: "red", size: "small", plantType: "tree"},
    {id: 2, name: "Banana", color: "yellow", size: "small", plantType: "tree"},
    {id: 3, name: "Cherry", color: "red", size: "tiny", plantType: "tree"},
    {id: 4, name: "Strawberry", color: "red", size: "tiny", plantType: "vine"},
    {id: 5, name: "Grape", color: "purple", size: "tiny", plantType: "vine"},
    {id: 6, name: "Watermelon", color: "green", size: "big", plantType: "vine"},
    {id: 7, name: "Blueberry", color: "blue", size: "tiny", plantType: "bush"},
    {id: 8, name: "Raspberry", color: "red", size: "tiny", plantType: "bush"},
];

// Create the router
fruitsRouter = express.Router();

// Middleware
// Intercept any request to a route handler with the :id parameter,
// and check if the id is valid or not.
fruitsRouter.param('fruitId', (req, res, next, id) => {
    
    let fruitId = Number(id);

    // Check if a fruit object with this ID already exists
    const fruitIndex = fruits.findIndex((element) => {
        return element.id === fruitId;
    });

    if (fruitIndex === -1) {
        res.status(404).send('That fruit does not exist');
    }
    else {
        // creates a 'fruitIndex' on the request parameter and sets it's value.
        req.fruitIndex = fruitIndex;
        next();
    }
});

// GET routes
fruitsRouter.get('/', (req, res, next) => {
    // Return array of fruits that have color = req.query.color
    if(req.query.color){        
        const response = fruits.filter((element) => element.color === req.query.color);
        res.status(200).send(response);
    }
    else{
        // Return ALL fruits
        res.status(200).send(fruits);
    }
});

fruitsRouter.get('/:fruitId', (req, res, next) => {
    res.status(200).send(fruits[req.fruitIndex]);
});

// POST routes
fruitsRouter.post('/', (req, res, next) => {
    // Check if the request body contains a name
    if (req.body.name) {
        // Generate new ID
        const newFruitId = utils.generateId(fruits);

        // Create new Fruit object using req.body
        const newFruit = req.body;

        // Set the ID of the new fruit
        newFruit.id = newFruitId;

        // Add the fruit object to the fruits array
        fruits.push(newFruit);

        // Send back response along with new user object
        res.status(201).send(newFruit);
    }
    else {
        res.status(409).send("Fruit must have a name");
    }
});

// PUT routes
fruitsRouter.put('/:fruitId', (req, res, next) => {
    // Edit fruit object
    // Check if the body's ID matches the URL param ID
    if (req.body.id === Number(req.params.fruitId)) {
        fruits[req.fruitIndex] = req.body;
        res.status(200).send(fruits[req.fruitIndex]);
    }
    else {
        res.status(409).send();
    }
});

// DELTE routes
fruitsRouter.delete('/:fruitId', (req, res, next) => {
    // Delete fruit obj
    fruits.splice(req.fruitIndex, 1);
    res.status(200).send();
});

// Export the router
module.exports = fruitsRouter;