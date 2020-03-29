var express = require('express');
const zmq = require("zeromq");
var router = express.Router();

const sock = new zmq.Publisher
sock.bind("tcp://127.0.0.1:3000")

router.post('/web', function(req, res, next) {
  console.log(req.body.path);
  sock.send(['BDTW', JSON.stringify(req.body)]);
  res.send('Ok');
});

router.get('/mobile', function(req, res, next) {
  sock.send(['MobileBDT', JSON.stringify(req.body)]);
  res.send('Ok');
});

module.exports = router;