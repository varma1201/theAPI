var express = require('express');
var router = express.Router();
var { MongoClient } = require('mongodb');
var mongoClient = new MongoClient('mongodb://127.0.0.1:27017');

/* GET home page. */
router.get('/', function (req, res, next) {
  getDetails()
    .then((document) => {
      if (document.length) {
        console.log('Data Found');
        res.send(JSON.stringify(document));
      }
    })
    .catch(console.error)
    .finally(console.log('done'));
});

async function getDetails() {
  await mongoClient.connect();
  console.log('connected');
  var db = mongoClient.db('vikramTesting');
  var collection = db.collection('vikramProductData');
  var result = collection.find().toArray();
  return result;
}

module.exports = router;
