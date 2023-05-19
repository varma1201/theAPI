var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var { MongoClient } = require('mongodb');
var mongoClient = new MongoClient('mongodb://127.0.0.1:27017');

/* GET home page. */
router.post('/', function (req, res, next) {
  var resobj = {};
  connectToDb(req.body)
    .then((document) => {
      if (document.length) {
        bcrypt.compare(
          req.body.password,
          document[0].password,
          function (err, result) {
            if (result) {
              resobj.msg = 'valid user';
            } else {
              resobj.msg = 'invalid user';
            }
            res.send(JSON.stringify(resobj));
          }
        );
      } else {
        console.log('error');
      }
    })
    .catch(console.error())
    .finally(console.log('done'));
});
async function connectToDb(reqData) {
  // Use connect method to connect to the server
  await mongoClient.connect();
  const db = mongoClient.db('vikramTesting');
  const collection = db.collection('vikramLogin');
  // var result = collection.find({}).toArray();
  var result = collection.find({ userName: reqData.userName }).toArray();
  // console.log(result);
  return result;
}

module.exports = router;
