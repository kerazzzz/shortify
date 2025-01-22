// const shortId = require("shortid")

const URL = require('../Models/url');
const shortid = require("shortid");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error : "Provide Valid URL"});

    const shortId= shortid();

    await URL.create({
        shortId: shortId,
        redirectedURL: body.url,
        visitHistory:[],
    });
     
    return res.json({id: shortId});
}

module.exports ={
    handleGenerateNewShortURL,
}









