const express = require('express');
const app = express();

const {MongoClient} = require('mongodb');
const bodyParser = require('body-parser');

const path = require('path');

const createExpressApp = require('./create-express-app');

require('dotenv').config();

let mongoclient;

console.log('Server Started');

async function initializeDBConnections(){
        
    let client = new MongoClient(process.env.DB_CONN,{ useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    console.log("Database connection ready");

    // Initialize the app.
    createExpressApp().listen(3000, () => {
        mongoclient= client;
        console.log("App Run in Port 3000");
    });
}

initializeDBConnections();