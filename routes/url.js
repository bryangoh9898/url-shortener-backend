
const ShortUrl = require('../models/ShortUrl');
var express = require('express');
var router = express.Router();
var shortid = require('shortid');
const dns = require('dns');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Welcome to URL Shortener');
});


//Creates a short URL - and save to database
router.post('/short', (req, res, next) => {
    
    //Takes in the full url 
    var longUrl = req.body.fullUrl;

    try {
        longUrl = new URL(longUrl)
    } catch(err){
            res.statusCode = 400;
            res.setHeader('Content-Type' , 'application/json');
            res.json({error: "Invalid URL Entered"})
            return res
    }

    //Check if URL exists
    dns.lookup(longUrl.hostname, (err) =>{
        if(err){
            res.statusCode = 400;
            res.setHeader('Content-Type' , 'application/json');
            res.json({error: "Address not found!"})
            return res
        }
    })

    var newShortUrl = shortid.generate()

    //Create the url in database
    ShortUrl.create({fullUrl: req.body.fullUrl, short: newShortUrl})
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        var temp = `${req.protocol}://${req.get('host')}/${newShortUrl}`
        console.log("User should see this URL")
        console.log(temp)
        res.json(temp)
        //res.json(result);
    }, (err) => next(err))
    .catch((err) => next(err))
    
});

//Retrieves all short url saved in database 
router.get('/:shortUrl' , (req,res,next) => {

    var shortUrl = req.params.shortUrl;

    //Find the short url in database
    ShortUrl.findOne({short: shortUrl})
    .then((url) => {
        //No such short url has been generated before
        if(url == null){
            res.statusCode = 400;
            res.setHeader('Content-Type' , 'application/json');
            res.json({error: "Invalid Short URL"})
            return res
        }

        //We redirect to new page
        res.redirect(url.fullUrl)

    })

})

module.exports = router;
