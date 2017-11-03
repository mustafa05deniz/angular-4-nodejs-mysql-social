'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    session = require('express-session'),
    hookJWTStrategy = require('./services/passportStrategy'),
    config = require('./config'),
    app = express(),
    cors = require('cors'),
    path = require('path');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
hookJWTStrategy(passport);
app.use(express.static(__dirname + '/../public'));
app.use(session({ secret: "selam" }));

app.use('/api',cors(), require('./routes/api')(passport),function (req,res) {});

app.get('*', function(req, res) {
    res.send("hello");
});

app.listen('8080', function() {
    console.log('server is running http://localhost:8080/! ');
    console.log("mysql database name : "+config.db.name);
});
