const zmq = require("zeromq");
const child_process = require('child_process');

async function run() {
  const sock = new zmq.Subscriber

  sock.connect("tcp://127.0.0.1:3005");
  sock.subscribe("e2eW");

  for await (const [topic, msg] of sock) {
     json = msg.toString();
     data = JSON.parse(msg)
     console.log(data)
     var workerProcess = child_process.exec('cd /home/jssosa10/uploads && npx cypress run --spec "'+ data.app+'_'+data.version+'_e2e.spec.js" > '+ data.resultPath + data.app+'_'+data.version+'_e2e_'+ Date.now()+'.txt',  
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