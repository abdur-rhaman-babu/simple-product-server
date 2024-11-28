const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

// abdurrahman65
// vWyZDR0tQIOL0Tki

const uri =
  "mongodb+srv://abdurrahman65:vWyZDR0tQIOL0Tki@cluster0.6avkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("productDB");
    const productCollection = database.collection("products");

    app.get("/products", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/products/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await productCollection.findOne(query)
      res.send(result)
    })

    app.post("/products", async (req, res) => {
      // console.log("post is hitting");
      const person = req.body;
      console.log("user", person);
      const result = await productCollection.insertOne(person);
      res.send(result);
    });

    app.put('/products/:id', async(req, res)=>{
      const id = req.params.id;
      const product= req.body;
      console.log(product)

      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}

      const updatedProduct = {
        $set:{
          name: product.name,
          price: product.price
        }
      }

      const result = await productCollection.updateOne(filter, updatedProduct, options)
      res.send(result)
    })

    app.delete("/products/:id", async (req, res) => {
      const id = req.params.id;
      // console.log("plz delete from database", id);
      const query = { _id: new ObjectId(id)};
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
