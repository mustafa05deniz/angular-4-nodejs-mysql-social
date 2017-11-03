// Application configuration.
'use strict';

var config = module.exports;

config.db = {
    user: 'root', 
    password: 'your_db_password',
    name: 'your_db_name'
};

config.db.details = {
    host: 'localhost',
    port: 3306,      
    dialect: 'mysql'
};

config.keys = {
    secret: '/jVdfUX+u/Kn3qPY4+ahjwQgyV5UhkM5cdh1i2xhozE=' // Not anymore...
};



var userRoles = config.userRoles = {
    customer: 1,    // ...001 customer
    seller: 2,     // ...010 seller
    admin: 4     // ...100 superAdmin
};

var userTypes = config.userTypes ={
    normalUser   :1,
    facebookUser :2,
    twitterUser  :3,
    googleUser   :4,
    linkedinUser :5,
    githubUser   :6,
    instagramUser:7
}

config.accessLevels = {
    customer: userRoles.customer | userRoles.seller | userRoles.admin,    // ...customers
    seller: userRoles.seller | userRoles.admin,                           // ...sellers
    admin: userRoles.admin                                                // ...admins
};