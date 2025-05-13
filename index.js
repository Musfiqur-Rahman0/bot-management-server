const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId} = require("mongodb");
const uri = "mongodb+srv://musfiqurrhaman6:z7S7XCzvQU05RBqe@cluster0.nliquld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app  = express();
const port = 3000;


app.use(cors());
app.use(express.json())

const client = new MongoClient(uri, {
    serverApi : {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})


app.get("/", (req, res)=> {
    res.send("Hellow world!")
});




const run = async() => {
    try {

        const botsCollection = client.db("botsdb").collection("bots");
        app.get("/bots", async(req, res)=> {
            const cursor = botsCollection.find();
            const result =await cursor.toArray();
            res.send(result);
        })


        app.post("/bots", async(req, res)=> {
            console.log("data from the client" , req.body);
            const newBot = req.body;
            const result= await botsCollection.insertOne(newBot);
            res.send(result);
        });

        app.delete("/bots/:id", async(req, res)=> {
            console.log("id to be deleted", req.params.id);
            const id = req.params.id;
            const query= { _id : new ObjectId(id)};
            const result = await botsCollection.deleteOne(query);
            res.send(result)
        })




        

        await client.connect(); 
        await client.db("admin").command({ping  : 1});
           console.log("Pinged your deployment. You successfully connected to MongoDB!");              
    }finally{

    }
}


run().catch(console.dir)









app.listen(port, ()=> {
    console.log("bot server is runing on ", port)
})