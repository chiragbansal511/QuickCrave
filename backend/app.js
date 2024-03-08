const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require("cors");
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});
url = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(url);
const secretKey = 'your_secret_key';
const dbName = 'hungerbox';
const saltRounds = 2;

app.listen(80, () => {
  console.log("Server started");
})

server.listen(8080, () => {
  console.log("socket network started");
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

  const exists = await client.db(dbName).collection('adminlogin').findOne({ hotelname: req.body.hotelname });
  if (exists == null) {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      user.password = hash;
      await client.db(dbName).collection('adminlogin').insertOne(user);
      const accessToken = jwt.sign({ hotelname: user.hotelname }, secretKey);
      res.json({ accessToken: accessToken });
    });
  }

  else {
    res.json("already exists");
  }
})

app.post("/openhotel", authenticateToken, async (req, res) => {

  try {
    const response = await client.db(dbName).collection(jwt.decode(req.token).hotelname).insertOne({ menu: req.body });
    res.json("inserted");
  }

  catch (error) {
    res.json("error");
  }
})

app.get("/closehotel", authenticateToken, async (req, res) => {
  try {
    const response = await client.db(dbName).collection(jwt.decode(req.token).hotelname).deleteOne({});
    res.json("deleted");
  } catch (error) {
    res.json("error");
  }
})

app.post('/isopen', authenticateToken, async (req, res) => {
  try {
    const response = await client.db(dbName).collection(req.body.hotelname).findOne({});
    if (response == null) {
      res.json("closed");
    }

    else {
      res.json(response);
    }
  } catch (error) {
    res.json("error");
  }
})

app.post("/order", (req, res) => {
  try {
    io.to(req.body.hotelname).emit("order", {
      order : req.body.order,
      user : req.body.username
    });

    res.json("ordered");
  } catch (error) {
    res.json("error");
  }
})

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('joinroom', (roomname) => {
    socket.join(roomname);
    console.log(`join room ${roomname}`);
  })
});
