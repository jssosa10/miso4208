const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

const uploadRouter = require('./routes/upload');
const appsRouter = require('./routes/apps');
const estrategiasRouter = require('./routes/estrategias');
const dispositivosRouter = require('./routes/dispositivos');
const e2eRouter = require('./routes/e2e');
const rtRouter = require('./routes/rt');
const BDTRouter = require('./routes/bdt');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ extented: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/upload', uploadRouter);
app.use('/apps', appsRouter);
app.use('/e2e', e2eRouter);
app.use('/rt', rtRouter);
app.use('/bdt', BDTRouter);
app.use('/estrategias', estrategiasRouter);
app.use('/dispositivos', dispositivosRouter);

//app.use('/e2e', e2eRouter);
//app.use('/rt', rtRouter);

module.exports = app;
