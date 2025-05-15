const express = require('express')
const cors= require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// MongoDB 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.S3_BUCKET}:${process.env.SECRET_KEY}@simple-crud.fod3bbj.mongodb.net/?retryWrites=true&w=majority&appName=simple-crud`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const coffeesCollection = client.db('coffeeDB').collection('coffees')

    // Get Method or Read
    app.get('/coffees', async(req,res)=>{
      const result= await coffeesCollection.find().toArray();
      res.send(result)
    })
    
    // Add Coffees
    app.post('/coffees', async(req,res)=>{
      const newCoffee = req.body;
      const result= await coffeesCollection.insertOne(newCoffee);
      res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
  }
}
run().catch(console.dir);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
