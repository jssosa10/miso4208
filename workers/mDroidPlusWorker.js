const zmq = require("zeromq");
const child_process = require('child_process');

async function run() {
   const sock = new zmq.Subscriber

   sock.connect("tcp://127.0.0.1:3005");
   sock.subscribe("mDroidPlusW");

   for await (const [topic, msg] of sock) {
      json = msg.toString();
      data = JSON.parse(msg)
      console.log(data)
      //Se debe primero hacer mvn clean y luego mvn package parado en "mutation\MDroidPlus\" para que construya el jar MDROIDPlus-1.0.0.jar
      //Se generan 1712 mutaciones :O esto es bastante tiempo
      /*
      MutationType: NOT_PARCELABLE
      Locations: 3
      MutationType: NULL_INTENT
      Locations: 79
      MutationType: INVALID_SQL_QUERY
      Locations: 3
      MutationType: WRONG_STRING_RESOURCE
      Locations: 784
      MutationType: DIFFERENT_ACTIVITY_INTENT_DEFINITION
      Locations: 49
      MutationType: CLOSING_NULL_CURSOR
      Locations: 132
      MutationType: SDK_VERSION
      Locations: 0
      MutationType: FINDVIEWBYID_RETURNS_NULL
      Locations: 101
      MutationType: LENGTHY_GUI_CREATION
      Locations: 1
      */
      var workerProcess = child_process.exec('java -jar mutation/MDroidPlus/target/MDroidPlus-1.0.0.jar mutation/MDroidPlus/libs4ast/ mutation/workspace/MyExpenses/myExpenses/src/main/ org.totschnig.myexpenses mutation/workspace/MyExpenses/mutaciones/ mutation/MDroidPlus/ false',
         function (error, stdout, stderr) {
            if (error) {
               console.log(error.stack);
               console.log('Error code: ' + error.code);
               console.log('Signal received: ' + error.signal);
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
         });
      workerProcess.on('exit', function (code) {
         console.log('Child process exited with exit code ' + code);
      });
   }
}


run()
