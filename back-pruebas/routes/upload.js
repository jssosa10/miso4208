const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = "/home/jssosa10/uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        name = file.originalname.endsWith(".js") ?  ".spec.js" : "_config.json";
        console.log(file.originalname, name);
        cb(null,req.query.app  +"_"+ req.query.version + "_" + req.query.type + name);
    }
});


const upload = multer({
    storage
});


router.post('/script', upload.single('script'), (req, res) =>{
    try {
        res.send(req.files);
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.post('/config', upload.single('config'), (req, res) => {
    try{
        res.send(req.files);
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

module.exports = router;