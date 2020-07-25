const express = require('express');
const {MongoClient} = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkJwt = require('express-jwt');

function apiRouter() {
  const router = express.Router();

  router.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path: '/api/authenticate'})
  );

  router.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ error: err.message });
    }
  });

    router.get('/products', async (req, res) => {

        let client = new MongoClient(process.env.DB_CONN,{ useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        const cursor = await client.db(process.env.DB_NAME).collection('Products')
                            .find({});

        const result = await cursor.toArray((err, docs) => {
            return res.json(docs)
        });
    });

    router.post('/products', async(req,res) => {
        const product = req.body;
    
        let client = new MongoClient(process.env.DB_CONN,{ useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    
        const productCollection = await client.db(process.env.DB_NAME).collection('Products');
    
        productCollection.insertOne(product, (err, r) => {
        if (err) {
          return res.status(500).json({ error: 'Error inserting new record.' });
        }
    
        const newRecord = r.ops[0];
    
        return res.status(201).json(newRecord);
      });
    
    });

    router.post('/authenticate', async(req, res) => {
      const user = req.body;
      
      let client = new MongoClient(process.env.DB_CONN,{ useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
    
      const usersCollection = await client.db(process.env.DB_NAME).collection('Users');
  
      usersCollection
        .findOne({ username: user.username }, (err, result) => {
          if (!result) {
            return res.status(404).json({ error: 'user not found' })
          }
  
          if (!bcrypt.compareSync(user.password, result.password)) {
            return res.status(401).json({ error: 'incorrect password '});
          }
  
          const payload = {
            username: result.username,
            admin: result.admin
          };
  
          const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });
  
          return res.json({
            message: 'successfuly authenticated',
            token: token
          });
        });
    });  

  return router;
}

module.exports = apiRouter;
