'use strict';


var config = require('../config'),
    db = require('../services/database'),
    Users = require('../models/user');

// The user controller.
var UserController = {
    index: function(req, res) {
        Users.find({attributes: ['id', 'email','username','password','role'],where: {id: req.user.id}})
            .then(user => {
                
                res.status(200).jsonp(user);
            });
    }
};

module.exports = UserController;