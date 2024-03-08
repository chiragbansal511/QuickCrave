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

app.listen(80, () => {
  console.log("Server started");
})

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

app.get("/auth", authenticateToken, (req, res) => {
  res.json("1");
});

app.post('/login/admin', async (req, res) => {

  const user = {
    username: req.body.username,
    hotelname: req.body.hotelname,
    password: req.body.password
  }

  const response = await client.db(dbName).collection('adminlogin').findOne({ username: user.username, hotelname: user.hotelname });
  if (response == null) {
    res.json('user does not exist');
  }

  else {
    bcrypt.compare(req.body.password, response.password, function (err, result) {
      if (result) {
        const accessToken = jwt.sign({ hotelname: user.hotelname }, secretKey);
        res.json({ accessToken: accessToken });
      }

      else res.json('failed');
    })
  }
})

app.post('/signup/admin', async (req, res) => {

  const user = {
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
    hotelname: req.body.hotelname,
  }

  const exists = await client.db(dbName).collection('adminlogin').findOne({ hotelname: user.hotelname });
  if (exists == null) {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      user.password = hash;
      await client.db(dbName).collection('adminlogin').insertOne(user);
      const accessToken = jwt.sign({ hotelname: user.hotelname }, secretKey);
      res.json({ accessToken: accessToken });
    });
  }

  else {
    res.json("hotel already exists");
  }
})

app.post("/menu", authenticateToken, async (req, res) => {

  try {

    const response = await client.db(dbName).collection(jwt.decode(req.token).hotelname).insertOne({ menu: req.body });
    res.json("inserted");

  }

  catch (error) {
    res.json("error");
  }
})

app.get("/close", authenticateToken, async (req, res) => {
  try {
    const response = await client.db(dbName).collection(jwt.decode(req.token).hotelname).deleteOne({});
    res.json("deleted");
  } catch (error) {
    res.json("error");
  }
})

app.get('/open', authenticateToken, async (req, res) => {
  try {
    const response = await client.db(dbName).collection(req.body.hotelname).findOne({});
    if (response == null) {
      res.json("closed");
    }

    else {
      res.json("open");
    }
  } catch (error) {
    res.json("error");
  }
})