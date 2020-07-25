require('dotenv').config();

const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');

const users = require('./users');
const products = require('./products');

async function initializeDBRecords(collectionName, data){
        
    const client = new MongoClient(process.env.DB_CONN,{ useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    console.log("Connection Established with Database");

    // await client.db(process.env.DB_NAME).collection(collectionName).drop();
    
    data.forEach((item) => {
        if (item.password) {
            item.password = bcrypt.hashSync(item.password, 10);
        }
    });
    
    const result = await client.db(process.env.DB_NAME).collection(collectionName).insertMany(data);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
    client.close
    console.log("Clossing Connections");
}

initializeDBRecords('Users', users);
initializeDBRecords('Products', products);