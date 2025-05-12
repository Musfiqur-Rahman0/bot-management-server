const express = require("express");
const cors = require("cors");

const app  = express();
const port = 3000;


app.use(cors());
app.use(express.json())


const bots = [
    {
        id: 1,
        name: "sakib",
        email: "botsakib@gmail.com"
    },
    {
        id: 2,
        name: "makib",
        email: "botmakib@gmail.com"
    },
    {
        id: 3,
        name: "takib",
        email: "bottakib@gmail.com"
    },
]

app.get("/", (req, res)=> {
    res.send("Hellow world!")
});

app.get("/bots", (req, res)=> {
    res.send(bots);
});

app.post("/bots", (req, res)=> {
    // console.log(req.body);
    const newBot = req.body ;
    console.log(newBot);
    
    bots.push(newBot);
    console.log(bots)
})






app.listen(port, ()=> {
    console.log("bot server is runing on ", port)
})