var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcrypt-nodejs');
var path = require('path');
var config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});

app.use(morgan('dev'));

mongo.connect(config.db, function(err, database){

    var authRouter = require('./app/routes/authenticate')(app, express, database, bcrypt);
    app.use('/authenticate', authRouter);

    var apiRouter = require('./app/routes/api')(app, express, database, bcrypt);
    app.use('/api', apiRouter);


    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
    });


    app.listen(config.port);

    console.log('Running on port ' + config.port);


});
