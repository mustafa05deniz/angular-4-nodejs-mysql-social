'use strict';

var jwt = require('jsonwebtoken');


var config = require('../config'),
    db = require('../services/database'),
    User = require('../models/user');

// The authentication controller.
var AuthController = {};


AuthController.facebook = function (req,res) {
    
    console.log(req.user.id);
    User.findOne({where :{socialID:req.user.id}}).then(function(user) {
        console.log("user bulundu");
        
        if(!user) {
            res.status(404).json({ message: 'Authentication failed!' });
        } else {
            var token = jwt.sign(
                { username: user.username },
                config.keys.secret,
                { expiresIn: '30m' }
            );

            

            var data=user.role+"data"+'JWT '+token;

            res.redirect("http://localhost:4200/"+data);
         
               
            
        }
    }).catch(function(error) {
        res.status(500).json({ message: 'There was an error!' });
    });
    
}

AuthController.twitter = function (req,res) {
    User.findOne({where :{socialID:req.user.id}}).then(function(user) {
        console.log("user bulundu");
        console.log(req.user);
        if(!user) {
            res.status(404).json({ message: 'Authentication failed!' });
        } else {
            var token = jwt.sign(
                { username: user.username },
                config.keys.secret,
                { expiresIn: '30m' }
            );
            var data=user.role+"data"+'JWT '+token;
            console.log(data);
            res.redirect("http://localhost:4200/social/"+data);
        }
    }).catch(function(error) {
        res.status(500).json({ message: 'There was an error!' });
    });
}

AuthController.google = function (req,res) {
    console.log("****** google kismi ******")
    
    console.log("****** google kismi ******")
    User.findOne({where :{id:req.user.id}}).then(function(user) {
        console.log("user bulundu"+req.user.id);
        console.log(user);
        if(!user) {
            res.status(404).json({ message: 'Authentication failed!' });
        } else {
            var token = jwt.sign(
                { username: user.username },
                config.keys.secret,
                { expiresIn: '30m' }
            );
            var data=user.role+"data"+'JWT '+token;
            console.log(data);
            res.redirect("http://localhost:4201/social/"+data);
        }
    }).catch(function(error) {
        res.status(500).json({ message: 'There was an error!' });
    });
}


// Register a user.
AuthController.signUp = function(req, res) {
    console.log("signup");
    if(!req.body.username || !req.body.password) {
        res.json({ message: 'Please provide a username and a password.' });
    } else {
        db.sync().then(function() {
            var newUser = {
                email : req.body.email,
                username: req.body.username,
                password: req.body.password
            };

            return User.create(newUser).then(function() {
                res.status(201).json({ message: 'Account created!' });
            });
        }).catch(function(error) {
            console.log(error);
            res.status(403).json({ message: 'Username already exists!' });
        });
    }
}


// Authenticate a user.
AuthController.authenticateUser = function(req, res) {
    console.log("sa");
    console.log(req.body.username);
    console.log(req.body.password);
    if(!req.body.username || !req.body.password) {
        res.status(404).json({ message: 'Username and password are needed!' });
    } else {
        var email = req.body.username,
            username = req.body.username,
            password = req.body.password,
            potentialUser = { where: { username: username } };

        User.findOne(potentialUser).then(function(user) {
            if(!user) {
                res.status(200).json({ message: 'Authentication failed!' });
            } else {
                user.comparePasswords(password, function(error, isMatch) {
                    if(isMatch && !error) {
                        var token = jwt.sign(
                            
                            { username: user.username },
                            config.keys.secret,
                            { expiresIn: '30m' }
                        );

                        res.json({
                            success: true,
                            id:user.id,
                            token: 'JWT ' + token,
                            role: user.role
                        });
                    } else {
                        res.status(200).json({ message: 'Login failed!' });
                    }
                });
            }
        }).catch(function(error) {
            res.status(500).json({ message: 'There was an error!' });
        });
    }
}




module.exports = AuthController;