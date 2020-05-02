const zmq = require("zeromq");
const child_process = require('child_process');

async function run() {
  const sock = new zmq.Subscriber

  sock.connect("tcp://127.0.0.1:3005");
  sock.subscribe("dataGW");

  for await (const [topic, msg] of sock) {
     json = msg.toString();
     data = JSON.parse(msg)
     console.log(data)
     var workerProcess = child_process.exec('java -jar data_generation/demo-0.0.1-SNAPSHOT.jar  10 > '+ data.resultPath + data.app+'_'+data.version+'_dataGenerated_'+ Date.now()+'.txt',  
     function (error, stdout, stderr) {  
         if (error) {  
            console.log(error.stack);  
            console.log('Error code: '+error.code);  
            console.log('Signal received: '+error.signal);  
         }  
         console.log('stdout: ' + stdout);  
         console.log('stderr: ' + stderr);  
      });  
      workerProcess.on('exit', function (code) {  
         console.log('Child process exited with exit code '+code);  
      });
  }
}


run()