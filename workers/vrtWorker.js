const zmq = require("zeromq");
const resemble = require('resemblejs');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

let db;
MongoClient.connect('mongodb+srv://mongouser:w9mlvPJzQOMkmdlj@cluster0-uzowf.mongodb.net/visual_reg_taller', { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);
  db = database.db('visual_reg_taller');
});

async function run() {
  const sock = new zmq.Subscriber

  sock.connect("tcp://127.0.0.1:3006");
  sock.subscribe("vrt");

  for await (const [topic, msg] of sock) {
     json = msg.toString();
     data = JSON.parse(msg)
     for (x of data){
         regression(x);
     }

  }
}


const regression =(data) => {
    let img1 = data['img1'];
    let img1 = data['img2'];

  
    resemble(img1).compareTo(img2).ignoreLess()
    .onComplete((data) => {
      fs.writeFile("./output.png", data.getBuffer(), () => {
        let currTime = new Date().getTime();
        let nImg1 = currTime + ".png";
        let nImg2 = currTime + " (1).png";
        let rImg = currTime + "_result.png";
        let fpth = "./static/results/";
        let fpth2 = "/results/";
        fs.createReadStream(img1).pipe(fs.createWriteStream(fpth + nImg1));
        fs.createReadStream(img2).pipe(fs.createWriteStream(fpth + nImg2));
        fs.createReadStream("./output.png").pipe(fs.createWriteStream(fpth + rImg));
        let results = {
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