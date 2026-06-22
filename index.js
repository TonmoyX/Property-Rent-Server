const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT
const uri = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    await client.connect();

    const propsDB = client.db('PropRentServer')
    const propertiesCollection = propsDB.collection("OwnerPropertiesData")
    const userBookingCollection = propsDB.collection("UserBookingsData")



    app.post('/addBookings', async (req, res) => {
      const data = req.body;
      const result = await userBookingCollection.insertOne(data)
      res.json(result)
    })

    app.get('/addBookings', async (req, res) => {
      const result = await userBookingCollection.find().toArray()
      res.json(result)
    })

    app.post('/addProperties', async(req, res) => {
        const data = req.body
        const result = await propertiesCollection.insertOne(data)
      res.json(result)
    })

    app.get('/getPropertiesData ', async(req, res) => {
        const result = await propertiesCollection.find().toArray()
      res.json(result)
    })

     app.get('/getPropertiesData/:id', async(req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await propertiesCollection.findOne(query)
      res.json(result)
    })

    app.delete('/getPropertiesData/:id', async (req, res) => {
      const {id} = req.params
      const query = { _id: new ObjectId(id) }
      const result = await propertiesCollection.deleteOne(query)
      res.json(result)
    })


    app.patch('/getPropertiesData/:id', async (req, res) => {
      const {id} = req.params
      const filter = { _id: new ObjectId(id) }
      const updateDoc = { $set: req.body }
      const result = await propertiesCollection.updateOne(filter, updateDoc)
      res.json(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
