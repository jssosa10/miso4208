const zmq = require("zeromq");
const child_process = require('child_process');

async function run() {
  const sock = new zmq.Subscriber

  sock.connect("tcp://127.0.0.1:3007");
  sock.subscribe("RTM");

  for await (const [topic, msg] of sock) {
     json = msg.toString();
     data = JSON.parse(msg)
     console.log(data)
     AppPackage = data.package;
     steps = data.steps;
     seed = data.seed;
     var workerProcess = child_process.exec(`./runMRT.sh ${data.name} ${data.version} ${data.key} ${data.device} ${data.port} ${data.package} ${data.steps} ${data.seed}> /home/uploads/${data.name}/run_rt_${data.version}_${data.key}_${data.device}.log`,  
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