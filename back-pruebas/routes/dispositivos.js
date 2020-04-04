const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'cnc123cnc',
    database : 'miso'
});


router.get('/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    try{
            pool.query('SELECT id, name FROM dispositivos WHERE tipo='+tipo+';', (err, rows, fields) => {
            if(err)
                throw err;
            res.send(rows);
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});


module.exports = router;