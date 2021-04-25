const Model = require('../models/index').User;
const crud = require("../generic/crud");

module.exports = {
    name: Model.name,
    auth(req, res, callback) {
        
        if(req.body.username=='admin'&&req.body.password=='admin@1'){
            
            res.json({
                status:"SUCCESS",
                type:'13f1f0d7-510c-448c-9e22-99d7dcd4e720'
            });
        }else if(req.body.username=='user'&&req.body.password=='User@1'){
            res.json({
                status:"SUCCESS",
                type:'f9fa2cdd8cacb7dfdff3bd0a721540476183'
            });
        }else{
            res.json({
                status:'FAILURE'
            })
            
        }
    }

};