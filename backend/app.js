const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json()); 

url = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(url);
const secretKey = 'your_secret_key';
const dbName = 'hungerbox';
const saltRounds = 2;

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.json('0').sendStatus(403);
      req.token = token;
      next();
  }); 
}

app.get("/auth" , authenticateToken , (req , res)=>{
   res.json("1");
});

