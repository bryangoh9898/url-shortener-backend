
const ShortUrl = require('../models/ShortUrl');
var express = require('express');
var router = express.Router();
var shortid = require('shortid');
// const dns = require('dns');

/* GET All URL. */
router.get('/short', function(req, res, next) {
    console.log("Run thi actualyl")
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

    //Validation for the address if needed

    var newShortUrl = `${req.protocol}://${req.get('host')}/${shortid.generate()}`

    //Create the url in database
    ShortUrl.create({fullUrl: req.body.fullUrl, short: newShortUrl})
    .then((result) => {
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'application/json');
        res.json(result)
    }, (err) => next(err))
    .catch((err) => next(err))
    
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
