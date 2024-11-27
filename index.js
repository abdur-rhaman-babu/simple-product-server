const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 7000

app.use(cors())
app.use(express.json())

// abdurrahman65
// vWyZDR0tQIOL0Tki

const uri = "mongodb+srv://abdurrahman65:vWyZDR0tQIOL0Tki@cluster0.6avkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

    const database = client.db("productDB");
    const productCollection = database.collection("products");

    app.get('/products', async(req,res)=>{
          const cursor = productCollection.find()
          const result = await cursor.toArray()
          res.send(result)
    })
    
    app.post('/products', async (req, res)=>{
        console.log('post is hitting')
        const person = req.body;
        console.log('user', person)
        const result = await productCollection.insertOne(person);
        res.send(result)
    })
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})