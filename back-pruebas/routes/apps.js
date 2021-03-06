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


router.get('/', (req, res) => {
    try{
            pool.query('SELECT id, name, description FROM apps', (err, rows, fields) => {
            if(err)
                throw err;
            res.send(rows);
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.post('/', (req, res) => {
    try{
        pool.query('INSERT INTO  apps (name, description) VALUES ("Untitled", "")', (err, rows) => {
            if(err)
                throw err;
            res.send(rows);
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.put('/:id/:name', (req, res) => {
    const id = req.params.id;
    const name = req.params.name;
    try{
        pool.query('UPDATE apps SET name = "' + name + '" WHERE id = '+id+';', (err) => {
            if(err)
                throw err;
            res.send("ok");
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.put('/tipo/:id/:tipo', (req, res) => {
    const id = req.params.id;
    const tipo = req.params.tipo;
    try{
        pool.query('UPDATE apps SET tipo = "' + tipo + '" WHERE id = '+id+';', (err) => {
            if(err)
                throw err;
            res.send("ok");
        });
    } catch(error) {
        console.log(error);
        res.send(400);
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    try{
        pool.query('SELECT * from apps WHERE id = '+id+';', (err, rows) => {
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
        pool.query('DELETE FROM apps WHERE id = '+id+';', (err) => {
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