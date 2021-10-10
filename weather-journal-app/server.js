// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors= require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`the server is up and running on port number ${PORT}`);
});

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server