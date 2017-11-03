'use strict';

// The admin controller.
var AdminController = {
    index: function(req, res) {
        var objects ={
            message: 'Welcome to the admin area ' + req.user.username + '!',
            list:{
                title :'title'
            },
            sellers:{
                total_seller:100,
                sellers_info:{
                    seller_name : '',
                    seller_company_name :'',
                    seller_stats:{
                        total_stats:100
                    }
                }
                
            },
            customers:{
                total_customers:100,
                customer_info:{
                    customer_name:'',
                    customer_order_count:100
                }
                
            }
        };
       
        res.status(200).json(objects);
    }
};

module.exports = AdminController;