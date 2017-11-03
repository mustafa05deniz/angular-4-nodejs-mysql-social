'use strict';

var router = require('express').Router();

var config = require('../config'),
    allowOnly = require('../services/routesHelper').allowOnly,
    AuthController = require('../controllers/authController'),
    UserController = require('../controllers/userController'),
    AdminController = require('../controllers/adminController');

var APIRoutes = function(passport) {


 

    // POST Routes.
    router.post('/signup', AuthController.signUp);
    router.post('/authenticate', AuthController.authenticateUser);


    // GET Routes.
    router.get('/profile', passport.authenticate('jwt', { session: false }), UserController.index);

    //FACEBOOK AUTH
    router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
    router.get('/auth/facebook/callback',passport.authenticate('facebook',{ session:true, failureRedirect: '/login'}),AuthController.facebook);
    //END FACEBOOK AUTH

    //TWİTTER AUTH
    router.get('/auth/twitter', passport.authenticate('twitter',{session: false}));
    router.get('/auth/twitter/callback',passport.authenticate('twitter',{ session:true, failureRedirect: '/login'}),AuthController.twitter);
    //END TWİTTER AUTH

    //GOOGLE AUTH
    router.get("/auth/google",passport.authenticate('google', { session: false,scope: [ 'https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/plus.profile.emails.read' ]}));
    router.get("/auth/google/callback",passport.authenticate('google',{ failureRedirect: '/login'}),AuthController.google);
    //END GOOGLE AUTH

    //TOKEN BASED AUTH WİTH SOCİAL SYSTEM
    router.get("/social/:token",function(req,res){console.log("token right here :"+req.params.token);});
    // END TOKEN BASED AUTH WİTH SOCİAL SYSTEM

   


    return router;
};

module.exports = APIRoutes;


