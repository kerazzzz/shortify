const express = require("express");
const urlRoute = require("./Routes/url");

const URL = require("./Models/url")
const connectToMongoDB = require('./connect')

const app = express();

app.use(express.json());

const PORT = 8000;

connectToMongoDB( 'mongodb://127.0.0.1:27017/urlShortner-DB')
.then(()=>{console.log("MongoDB connected")})
.catch((err)=>{console.log("error:", err)});


app.use("/url", urlRoute)

app.get("/:shortId", async(req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, 
    {
        $push: {
            visitHistory:{
             timestamp:Date.now(),
            }, 
        },
    }

    );
    res.redirect(entry.redirectedURL);

});   


app.listen(PORT, ()=>{
    console.log("Server Running!");                 
});

















