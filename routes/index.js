var express = require('express');
var router = express.Router();
const ShortUrl = require('../models/ShortUrl');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Retrieves all short url saved in database 
router.get('/:shortUrl' , (req,res,next) => {

  var shortUrl = `${req.protocol}://${req.get('host')}/${req.params.shortUrl}`

  //Find the short url in database
  ShortUrl.findOne({short: shortUrl})
  .then((url) => {
      //No such short url has been generated before
      if(url == null){
          res.statusCode = 404;
          res.setHeader('Content-Type' , 'application/json');
          res.json({error: "Invalid Short URL"})
          return res
      }


      if(url.clicks >= 3){
        //We will redirect to error page 
        res.statusCode = 404;
        res.setHeader('Content-Type' , 'application/json');
        res.json({error: "Short URL link has expired. Please Generate a new one"})
        return res

      }
      else{
        //We will increase the number of clicks by one
        console.log("Original Clicks")
        console.log(url.clicks) 
        url.clicks++;
        url.save()
        .then(() => {
          //Redirect to website
          //If no HTTPS then we add it
          console.log("Updated")
          console.log(url.clicks)
          if(url.fullUrl.includes("http://") || url.fullUrl.includes("https://")){
            res.redirect(url.fullUrl)
          }
          else{
            res.redirect("https://" + url.fullUrl)
          }
        }, (err) => next(err))
        .catch((err) => next(err))

      }



  }, (err) => next(err))
  .catch((err) => next(err))

})

module.exports = router;
