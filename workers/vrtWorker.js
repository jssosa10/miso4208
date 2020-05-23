const zmq = require("zeromq");
const resemble = require('resemblejs');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');

let db;
MongoClient.connect('mongodb+srv://mongouser:w9mlvPJzQOMkmdlj@cluster0-uzowf.mongodb.net/visual_reg_taller', { useNewUrlParser: true }, (err, database) => {
//MongoClient.connect('mongodb+srv://angela:juanda2309@cluster0-4zsxc.mongodb.net/visual_reg_taller', { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);  
  db = database.db('visual_reg_taller');
  db.collection('visual_reg_taller').drop();
  //db.visual_reg_taller.drop();
});

async function run() {
  const sock = new zmq.Subscriber

  sock.connect("tcp://127.0.0.1:3010");
  sock.subscribe("vrt");

  for await (const [topic, msg] of sock) {
     json = msg.toString();
     data = JSON.parse(msg);
     console.log(data);
     let direct1 =data['direct1'];
     let direct2 =data['direct2'];
     let key1 =  data['key1'];
     let key2 = data['key1'];

     while(!fs.existsSync(key1)&&!fs.existsSync(key2)){
       console.log("wait fosr files");
       await sleep(10000);
     }
//ruta para guardar imagenes

     //consultar si hay imagenes en las carpetas 
     if(fs.lstatSync(direct1).isDirectory()&&fs.lstatSync(direct2).isDirectory()){
      
      var files1 = fs.readdirSync(direct1);
      var files2 = fs.readdirSync(direct2);   
      var filep = files1.length>files2.length?files2:files1;
      for (i = 0; i < filep.length; i++) {
      //for (i = 0; i < 1; i++) {
        let img=filep[i];
        let vtest="";
        if(img.indexOf(' -- ')>=0){
          let vtest=(img.split(' -- '))[1];
          console.log("test:::"+vtest);
        } 
        var img1 = path.join(direct1 + "/"+img);
        var img2 = path.join(direct2 + "/"+img);
        let datos = {
          image1: img1,
          image2: img2,
          test: vtest
        }
        regression(datos);
      }
      console.log("termino regresion ok");
      //regression(data);
     }
     
  }
}


const regression =(data) => {
    let img1 =data['image1'];
    let img2 =data['image2'];

    console.log("image1::"+img1);
    console.log("image2:"+img2);
    let currTime = new Date().getTime();
  
    resemble(img1).compareTo(img2).ignoreLess()
    .onComplete((data) => {

      fs.writeFile("./output_"+currTime+".png", data.getBuffer(), () => {
        
        let nImg1 = currTime + ".png";
        let nImg2 = currTime + " (1).png";
        let rImg = currTime + "_result.png";
        let fpth = "./static/results/";
        let fpth2 = "/results/";
        console.log("linea 72");
        fs.createReadStream(img1).pipe(fs.createWriteStream(fpth + nImg1));
        fs.createReadStream(img2).pipe(fs.createWriteStream(fpth + nImg2));
        fs.createReadStream("./output_"+currTime+".png").pipe(fs.createWriteStream(fpth + rImg));
        console.log("linea 76");
        let results = {
          test: data['test'],
          date: currTime,
          image1: fpth2 + nImg1,
          image2: fpth2 + nImg2,
          resultImage: fpth2 + rImg,
          info: 'Missmatch percentage: ' + data.misMatchPercentage
        }
        saveResults(results);
      });
    });
  }
  
 const saveResults = (results) => {
    db.collection('visual_reg_taller').save(results, (err, result) => {
      if (err) return console.log(err);
      console.log('saved to database');
    })
  }

run()