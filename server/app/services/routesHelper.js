'use strict';

exports.allowOnly = function(accessLevel, callback) {
    function checkUserRole(req, res) {
        console.log("accesslevel :"+accessLevel);
        console.log("req.user.role :"+req.user.role);
        if(!(accessLevel & req.user.role)) {
            res.status(200).json({message:'you are not a seller'});
            return;
        }

        callback(req, res);
    }

    return checkUserRole;
};