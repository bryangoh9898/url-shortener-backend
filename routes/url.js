
const ShortUrl = require('../models/ShortUrl');
var express = require('express');
var router = express.Router();
var shortid = require('shortid');
const urlExists = require('url-exists');


/* GET All URL. */
router.get('/short', function(req, res, next) {
    ShortUrl.find({})
    .then((urls) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(urls)
        return res
    }, (err) => next(err))
    .catch((err) => next(err))
});


//Creates a short URL - and save to database
router.post('/short', (req, res, next) => {

    var tempFullUrl = req.body.fullUrl
    //Validation for the address added
    if( !req.body.fullUrl.includes("http://") &&  !req.body.fullUrl.includes("https://")){
        tempFullUrl = "https://" + req.body.fullUrl 
    }

    urlExists(tempFullUrl, function(err, exists) {
        if (exists) {
            console.log("exists")
            var newShortUrl = `${req.protocol}://${req.get('host')}/${shortid.generate()}`

            //Create the url in database
            ShortUrl.create({fullUrl: req.body.fullUrl, short: newShortUrl})
            .then((result) => {
                console.log(result);
                res.statusCode = 200;
                res.setHeader('Content-Type' , 'application/json');
                res.json(result)
            }, (err) => next(err))
            .catch((err) => next(err))
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type' , 'application/json');
            res.json("Bad Url")
        }
      });
});

router.delete('/short', (req,res,next) => {

    ShortUrl.deleteMany({})
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json("successsful")
        return res
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = router;
