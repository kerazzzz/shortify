const express = require("express");
const urlRoute = require("./Routes/url");

const URL = require("./Models/url")
const connectToMongoDB = require('./connect')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

const PORT = 8000;

connectToMongoDB( 'mongodb://127.0.0.1:27017/urlShortner-DB')
.then(()=>{console.log("MongoDB connected")})
.catch((err)=>{console.log("error:", err)});


const path= require("path")

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use("/url", urlRoute)

// app.get("/:shortId", async(req, res)=>{
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId,
//     }, 
//     {
//         $push: {visitHistory:{timestamp:Date.now() } } },

//     );

//     res.redirect(entry.redirectedURL);
 
// });   

app.get('/home', (req, res)=>{
    res.render('home')

})

app.get("/test", async(req, res)=>{
    const allUrls = await URL.find({});
    return res.render('index',{ 
        urls: allUrls, })
    
});   

app.get("*", (req, res) => {
    res.status(404).send("404 Not Found");
});


app.get("/:shortId", async(req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId }, 
        { $push: { visitHistory: { timestamp: Date.now() } } },
        
    );
    
    // null check 
    if (!entry) return res.status(404).send("Short URL not found");
    
    res.redirect(entry.redirectedURL);
});


app.listen(PORT, ()=>{
    console.log("Server Running!");                 
});

















