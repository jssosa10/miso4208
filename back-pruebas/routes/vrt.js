var express = require('express');
const zmq = require("zeromq");
var router = express.Router();

const sock = new zmq.Publisher
sock.bind("tcp://127.0.0.1:3010")

router.post('/', function(req, res, next) {
  console.log(req.body);
  sock.send(['vrt', JSON.stringify(req.body)]);
  res.send('Ok');
});

module.exports = router;
