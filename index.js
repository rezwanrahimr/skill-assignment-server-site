
const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const cors = require("cors");
require("dotenv").config();

// Define Port Number
const port = process.env.PORT || 8080;

// Use Cors and bodyParser
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// MongoDB Connection
const uri = process.env.MONGODB_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  console.log(
    `${!!err ? "Database Connection Failed" : "Database Connection Successful"}`
  );
  const todosCollection = client.db("ToDo_App").collection("todos");

  // Get Specific User Todo
  app.get("/todos", (req, res) => {
    todosCollection.find({ email: req.query.email }).toArray((err, todos) => {
      if (err) {
        res.send(err);
      } else {
        res.send(todos);
      }
    });
  });
