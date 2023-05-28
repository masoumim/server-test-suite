# server-test-suite
An Express.js API with corresponding test suite that tests the various HTTP routes.

# project technical stack
Language: Node.js / JavaScript

Framework: Express.js

Test Framework: Mocha

Assertion Library: Chai

API Test Library: SuperTest

# project info
This project contains a simple 'fruits' API along with a test suite to test out the HTTP routes. The API routes enable getting, adding, updating and deleting various fruits to a simple array of fruit objects. The fruit objects have the following format: 

`{id: 1, name: "Apple", color: "red", size: "small", plantType: "tree"}`

As this project lacks a front-end / UI / Client, the best way to interact with the API is though Postman (https://www.postman.com/).

The test suite will test the following HTTP methods: GET, POST, PUT and DELETE.

# API endpoints
**Get:**
  

/fruits


/fruits/:id


/fruits?color=colorName

**Post:**
  

/fruits

**Put:**
  

/fruits/:id

**Delete:**
  

/fruits/:id

# installing and running
After cloning the repository, you can install all of the dependences automatically by typing `npm install` into the terminal.
To start the server, type `node server.js` into the terminal.
To run the automated tests, type `npm test` into the terminal.
