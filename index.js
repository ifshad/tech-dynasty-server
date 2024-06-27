const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lbhoupe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/products", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const productsCollection = db.collection("tech-products");
    const cursor = productsCollection.find();
    const result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const usersCollection = db.collection("tech-users");
    const cursor = usersCollection.find();
    const result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

app.get("/products/:id", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const productsCollection = db.collection("tech-products");
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await productsCollection.findOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.post("/products", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const productsCollection = db.collection("tech-products");
    const product = req.body;
    const result = await productsCollection.insertOne(product);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const usersCollection = db.collection("tech-users");
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.delete("/products/:id", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const productsCollection = db.collection("tech-products");
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await productsCollection.deleteOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.put("/products/:id", async (req, res, next) => {
  try {
    await client.connect();
    const db = client.db("tech-dynasty");
    const productsCollection = db.collection("tech-products");
    const updatedDoc = req.body;
    const product = {
      $set: {
        productName: updatedDoc.productName,
        imageUrl: updatedDoc.imageUrl,
        brandName: updatedDoc.updatedBrandName,
        price: updatedDoc.price,
        shortDescription: updatedDoc.shortDescription,
        rating: updatedDoc.rating,
      },
    };
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const result = await productsCollection.updateOne(query, product, options);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("TechDynasty store server running properly...");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Running on port:${port}`);
});

module.exports = app;
