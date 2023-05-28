/*
server.js: This file is the program entry point. It establishes an instance of the Express.js server,
mounts an instance of the fruitsRouter to the '/fruits' route and begins listening for requests.
*/

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

// Add body-parsing
app.use(express.json());

// Import fruitsRouter.
const fruitsRouter = require('./routes/fruits.js');

// Mount the fruitsRouter to the '/fruits' route.
app.use('/fruits', fruitsRouter);

// Start the server listening.
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });

  module.exports = app;