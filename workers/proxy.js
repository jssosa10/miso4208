const zmq = require("zeromq");

const proxy = new zmq.Proxy(new zmq.XSubscriber, new zmq.XPublisher)
proxy.frontEnd.bind("tcp://*:3005")
proxy.backEnd.bind("tcp://*:3006")
//setTimeout(() => proxy.terminate(), 5000)
proxy.run()