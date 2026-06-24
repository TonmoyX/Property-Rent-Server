const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
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

const JWKS = createRemoteJWKSet(
  new URL("https://property-rent-client.vercel.app/api/auth/jwks")
)

const verifyToken = async (req, res, next) =>{
  const authHeader = req?.headers.authorization
  if(!authHeader){
    return res,status(401).json({message: "Unauthorized"});
  }
  const token = authHeader.split(' ')[1]
  if(!token){
    return res,status(401).json({message: "Unauthorized"});
  }

  try{
    const {payload} = await jwtVerify(token, JWKS)
    console.log(payload)
    next()
  }
  catch(error){
       return res,status(403).json({message: "Forbidden"});
  }
  // console.log(token)
  // next()
}

async function run() {
  try {
    await client.connect();

    const propsDB = client.db('PropRentServer')
    const propertiesCollection = propsDB.collection("OwnerPropertiesData")
    const userBookingCollection = propsDB.collection("UserBookingsData")

    const usersRoleDB = client.db('PropRentClient')
    const usersCollection = usersRoleDB.collection("user")

    app.get('/getUsers', async(req, res) => {
      const result = await usersCollection.find().toArray()
      res.json(result)
    })
    
    app.patch('/updateUserRole/:id', async(req, res) => {
      const {id} = req.params
      const filter = { _id: new ObjectId(id) }
      const updateDoc = { $set: req.body }
      const result = await usersCollection.updateOne(filter, updateDoc)
      res.json(result)
    })

    app.post('/addBookings',verifyToken, async (req, res) => {
      const data = req.body;
      const result = await userBookingCollection.insertOne(data)
      res.json(result)
    })

    app.get('/addBookings', async (req, res) => {
      const result = await userBookingCollection.find().toArray()
      res.json(result)
    })

    app.patch('/addBookings/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await userBookingCollection.findOne(query)
      res.json(result)
    })

    app.post('/addProperties', async(req, res) => {
        const data = req.body
        const result = await propertiesCollection.insertOne(data)
      res.json(result)
    })

    app.get('/getPropertiesData', async(req, res) => {
        const result = await propertiesCollection.find().toArray()
      res.json(result)
    })

     app.get('/getPropertiesData/:id', async (req, res) => {
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
