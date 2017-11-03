'use strict';

var JWTStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

var User = require('./../models/user'),
    config = require('./../config');


var jwt = require('jsonwebtoken');

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
    var options = {};

    options.secretOrKey = config.keys.secret;
    options.jwtFromRequest = ExtractJwt.fromAuthHeader();
    options.ignoreExpiration = false;

    passport.serializeUser(function(user, done) {
        var token = jwt.sign({ username: user.username },config.keys.secret,{ expiresIn: '300m' });
        console.log("token : "+token);
        done(null, user);
    });
      
    passport.deserializeUser(function(obj, done) {
        console.log("notla");
        done(null, obj);
    });
    

    passport.use(new JWTStrategy(options, function(JWTPayload, callback) {
        console.log("buraya girdimi");
        User.findOne({ where: { username: JWTPayload.username } })
            .then(function(user) {
                if(!user) {
                    callback(null, false);
                    console.log("giri yapılmadi");
                    return;
                }
                console.log("user find callback");
                callback(null, user);
            });
    }));

    

    passport.use(new FacebookStrategy({
        clientID: "565741673600529",
        clientSecret:"882cfc16baeb11222f0586efd7cb102c" ,
        callbackURL: "http://localhost.com:8080/api/auth/google/callback",
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified']
      },
      function(accessToken, refreshToken, profile, done) {
        console.log("facebookStrategy kismi");
        console.log(profile);
        process.nextTick(function () {
        console.log("profile kismi");
        
            User.findOne({where :{ socialID : profile.id}})
                .then(function(user){
                    var isim = profile.name.givenName + profile.name.familyName ;
                    if(!user){
                        var newUser = {
                            email : profile.email,
                            username: isim,
                            password:"hello",
                            socialID:profile.id
                        };
                
                        return User.create(newUser).then(function() {
                            return done(null, profile);
                        });

                    }else{
                        
                        console.log("xxxxx");
                        return done(null, profile);
                        
                    }
                })
        
        });
      }
    ));

    passport.use(new TwitterStrategy({
        consumerKey: "YRnqy63CFbDMMxJSGnqhO3dQx",
        consumerSecret: "RJHNIjeMqsZ2WZf9lnkTzq6opxhVw5wF2s3ZOqGWM21s3RNzD5",
        callbackURL: "http://localhost.com:8080/api/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        console.log(profile);
        User.findOne({where :{ socialID : profile.id}})
            .then(function (user) {
                if(!user){
                    var newUser = {
                        username: profile.displayName,
                        password:"hello",
                        socialID:profile.id
                    };
                    console.log(newUser);
                    return User.create(newUser).then(function() {
                        return done(null, profile);
                    });
                }else{
                    console.log(profile);
                    console.log("xxxxx");
                    return done(null, profile);
                }
            })
      }
    ));

    passport.use(new GoogleStrategy({
        clientID:    "540676306948-0q6b7qoq9qjb138sbeu4dmfbv261mt4p.apps.googleusercontent.com",
        clientSecret: "NlTsnfiSlOjK_nBG6pnr4Rbw",
        callbackURL: "http://localhost.com:8080/api/auth/google/callback",
        passReqToCallback   : true
      },
      function(request, accessToken, refreshToken, profile, done) {
          console.log(profile);
        User.findOne({where :{ socialID : profile.id}})
        .then(function (user) {
            if(!user){
                var newUser = {
                    email:profile.email,
                    username: profile.displayName,
                    password:"hello",
                    socialID:profile.id
                };
                console.log(newUser);
                return User.create(newUser).then(function() {
                    return done(null, user);
                });
            }else{
                console.log(user);
                console.log("xxxxx");
                return done(null, user);
            }
        })
      }
    ));
}


module.exports = hookJWTStrategy;