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


router.get('/:appId', (req, res) => {
    const appId = req.params.appId;
    try{
            pool.query('SELECT id, nombre FROM versiones WHERE idApp='+appId+';', (err, rows, fields) => {
            if(err)
                throw err;
            res.send(rows);
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.post('/:appId', (req, res) => {
    const appId = req.params.appId;
    try{
        pool.query('INSERT INTO  versiones (nombre, idApp) VALUES ("Untitled",'+appId+')', (err, rows) => {
            if(err)
                throw err;
            res.send(rows);
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const query = `UPDATE versiones SET nombre = '${body.name}', link = '${body.link}' WHERE id = ${id};`
    try{
        pool.query(query, (err) => {
            if(err)
                throw err;
            res.send("ok");
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.get('/one/:id', (req, res) => {
    const id = req.params.id;
    try{
        pool.query('SELECT * from versiones WHERE id = '+id+';', (err, rows) => {
            if(err)
                throw err;
            res.send(rows);
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try{
        pool.query('DELETE FROM versiones WHERE id = '+id+';', (err) => {
            if(err)
                throw err;
            res.send("ok");
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

module.exports = router;