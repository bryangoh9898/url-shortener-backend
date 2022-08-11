var express = require('express');
var router = express.Router();
const ShortUrl = require('../models/ShortUrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Retrieves all short url saved in database 
router.get('/:shortUrl' , (req,res,next) => {
  var shortUrl = req.params.shortUrl;

  //Find the short url in database
  ShortUrl.findOne({short: shortUrl})
  .then((url) => {
      //No such short url has been generated before
      console.log(url)
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
