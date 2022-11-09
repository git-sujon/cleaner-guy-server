// all require
const express = require("express");
const app = express();
const cors = require("cors");
let jwt = require("jsonwebtoken");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { ObjectID } = require("bson");

// port
const port = process.env.PORT || 5000;

// midllewire
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.prabmlk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  const servicesCollection = client
    .db("cleanerGuy")
    .collection("servicesCollection");


    const reviewCollection= client.db('cleanerGuy').collection('reviewCollection')

  try {


// ........................ Start Of ServicesCollection ................. 


// Read single services Data From database 

app.get('/services/:id', async(req, res) => {
    const id = req.params.id
    const query = {_id: ObjectID(id)}
    const service= await servicesCollection.findOne(query)
    res.send(service)
})


// Read all services Data From database 

app.get('/services', async(req, res) => {



    const page= parseInt(req.query.page)
    const size = parseInt(req.query.size)
    const services= await servicesCollection.find({}).skip(page*size).limit(size).toArray()
    const count = await servicesCollection.estimatedDocumentCount()
    res.send({count,services})



})

// ........................ End Of ServicesCollection ................. 






  } 
  
  
  
  finally {
  }
};

run().catch((err) => console.log(err));

//staring the server

app.get("/", (req, res) => {
  res.send("This Server is alive !!!!");
});

// starting the port

app.listen(port, () => {
  console.log(port, "IS Runnig");
});
