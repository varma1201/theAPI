var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var saltRounds = 5;
var publicKey = 'My private key';
var { MongoClient } = require('mongodb');

var mongoClient = new MongoClient('mongodb://127.0.0.1:27017');

/* GET home page. */
router.post('/', function (req, res, next) {
  var resObj = {};
  var reqObj = req.body;
  bcrypt.hash(reqObj.password, saltRounds, function (err, hash) {
    console.log('Encrypted pwd is ' + hash);
    reqObj.password = hash;
    // console.log(reqObj.password);
    signupfun(reqObj)
      .then(() => {
        resObj.msg = 'Inserted';
        res.send(JSON.stringify(resObj));
      })
      .catch((error) => {
        resObj.msg = 'Error';
      })
      .finally(() => {
        //client.close();
      });
  });
});

async function signupfun(data) {
  await mongoClient.connect();
  var db = mongoClient.db('vikramTesting');
  var collection = db.collection('vikramLogin');
  collection.insertOne(data, () => {
    console.log('Data Entered');
  });
  return 'done';
}

module.exports = router;
