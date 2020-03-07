const zmq = require("zeromq");
const child_process = require('child_process');

async function run() {
  const sock = new zmq.Subscriber

  sock.connect("tcp://127.0.0.1:3000");
  sock.subscribe("RTM");

  for await (const [topic, msg] of sock) {
     json = msg.toString();
     data = JSON.parse(msg)
     console.log(data)
     AppPackage = data.package;
     steps = data.steps;
     seed = data.seed;
     var workerProcess = child_process.exec('cd /home/jssosa10/Android/Sdk/platform-tools && ./adb shell monkey -p ${AppPackage} -v ${steps} -s ${seed} > '+ data.resultPath + '_' + data.app+'_'+data.version+'_RT_'+ Date.now()+'.txt',  
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