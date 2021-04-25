const Model = require('../models/index').Faq;
const crud = require("../generic/crud");
const messages = require("../generic/messages"); 

module.exports = {
    name: Model.name,
    create(req, res, callback) {
        Model.findAll({
            attributes: ['order'],
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['order', 'ASC']
            ]
        }).then((data) => {
            var arr = JSON.parse(JSON.stringify(data));
            console.log(++arr[arr.length-1].order);
            req.body.order=arr[arr.length-1].order;
            console.log(req.body);
            if(data)
                Model.create(req.body)
                .then((data) => {
                    if(data)
                        //callback(data);
                        res.status(200).send(messages.__GENERIC_FOUND_OBJ(data, Model.name));
                    else
                        res.status(201).send(messages.__GENERIC_NOT_FOUND_OBJ(Model.name));         
                })
                .catch((error) => {
                    res.status(400).send(messages.__GENERIC_FAILURE_OBJ((error.errors ? error.errors : error.message)))
                });
                         
        });
    },
    list(req, res, callback){
        crud.findByAsc(req, res, callback, Model)
    },
    findById(req, res, callback){
        crud.findById(req, res, callback, Model)
    },
    update(req, res, callback){
        crud.update(req, res, callback, Model) 
    },
    bulkCreate(req, res, callback) {
        crud.bulkCreate(req, res, callback, Model)
    },
    delete(req, res, callback) {
        crud.delete({
            where: {
              id: req.body.id
            }}, res, callback, Model)
    },
    findByMdrTypeId(req, res, callback){          
        Model.findAll({
            where: {
              mdr_type_id: req.params.id
            },
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['order', 'ASC']
            ]
        })
        .then((data) => {
            if(data)
                res.status(200).send(messages.__GENERIC_FOUND_OBJ(data, Model.name));
            else
                res.status(201).send(messages.__GENERIC_NOT_FOUND_OBJ(Model.name));         
        })
        .catch((error) => {
            console.log(error);
            res.status(400).send(messages.__GENERIC_FAILURE_OBJ(error.errors))
        });
    },
    moveUp(req, res, callback){
        var sortedArr = [];
        var faqId = req.body.id;

        var currentFaq = {};
        var prevFaq = {};

        var currentFaqIndex;
        var prevFaqIndex;

        Model.findAll({
            where: {
              mdr_type_id: req.body.mdr_type_id
            },
            order: [
                ['order', 'ASC']
            ]
        })
        .then((data) => {
            var faqArr = JSON.parse(JSON.stringify(data));
            faqArr.forEach(element => {
                sortedArr.push(element); 
            });

            sortedArr.forEach(element => {
                if(element.id == faqId){
                    currentFaq = element;
                } 
            });
            currentFaqIndex = sortedArr.indexOf(currentFaq); 
            prevFaqIndex = --currentFaqIndex;
            prevFaq = sortedArr[prevFaqIndex];

            if(prevFaq){

                prevFaq = sortedArr[prevFaqIndex];

                currentFaq.order = currentFaq.order + prevFaq.order;
                prevFaq.order = currentFaq.order - prevFaq.order;
                currentFaq.order = currentFaq.order - prevFaq.order;

                Model.findById(currentFaq.id)
                .then((data) => {
                    if(data){
                         
                        data.update(currentFaq)
                        .then((updateData) => {
                            if(data){

                                
                                Model.findById(prevFaq.id)
                                .then((data) => {
                                    if(data){
                                         
                                        data.update(prevFaq)
                                        .then((updateData) => {
                                            if(data)
                      res.status(200).send(messages.__GENERIC_FOUND_OBJ(updateData, Model.name));
                    else
                        res.status(201).send(messages.__GENERIC_NOT_FOUND_OBJ(Model.name));
                                            
                                        })
                                    }
                                })  
                            }
                            
                        })
                    }
                })    

            }else{
                res.json({
                    "status": "FAILURE",
                    "message": "Can't Update"
                })
            }
               
        });
        
    },

    moveDown(req, res, callback){
        var sortedArr = [];
        var faqId = req.body.id;

        var currentFaq = {};
        var nextFaq = {};

        var currentFaqIndex;
        var nextFaqIndex;

        Model.findAll({
            where: {
              mdr_type_id: req.body.mdr_type_id
            },
            order: [
                ['order', 'ASC']
            ]
        })
        .then((data) => {
            var faqArr = JSON.parse(JSON.stringify(data));
            faqArr.forEach(element => {
                sortedArr.push(element); 
            });

            sortedArr.forEach(element => {
                if(element.id == faqId){
                    currentFaq = element;
                } 
            });
            currentFaqIndex = sortedArr.indexOf(currentFaq); 
            nextFaqIndex = ++currentFaqIndex;
            nextFaq = sortedArr[nextFaqIndex];

            console.log(nextFaqIndex);

            if(nextFaq){
                currentFaq.order = currentFaq.order + nextFaq.order;
                nextFaq.order = currentFaq.order - nextFaq.order;
                currentFaq.order = currentFaq.order - nextFaq.order;

                Model.findById(currentFaq.id)
                .then((data) => {
                    if(data){
                         
                        data.update(currentFaq)
                        .then((updateData) => {
                            if(data){

                                
                                Model.findById(nextFaq.id)
                                .then((data) => {
                                    if(data){
                                         
                                        data.update(nextFaq)
                                        .then((updateData) => {
                                            if(data)
                      res.status(200).send(messages.__GENERIC_FOUND_OBJ(updateData, Model.name));
                    else
                        res.status(201).send(messages.__GENERIC_NOT_FOUND_OBJ(Model.name));
                                            
                                        })
                                    }
                                })  
                            }
                            
                        })
                    }
                })    

            }else{
                res.json({
                    "status": "FAILURE",
                    "message": "Can't Update"
                })
            }
               
        });
        
    }
    

};