const Category_Types = require('../models/index').Type;
const Categories = require('../models/index').Category;
const MDRs = require('../models/index').Mdr;
//Category_Types.belongsTo(Categories, {foreignKey: 'category_id'});

const messages = require("../generic/messages");
const crud = require("../generic/crud");

module.exports = {
    //name: Category_Types.name,
    create(req, res, callback) {
        crud.create(req, res, callback, Category_Types)
    },
    // list(req, res, callback){
    //    // crud.findAll(req, res, callback, Category_Types)
    //    Categories.findAll({
    //         include: [
    //             {
    //             model: Category_Types
    //             }
    //         ]
    //     })
    //     .then((categories) => {

    //   const resObj = categories.map(category => {

    //     //tidy up the category data
    //     return Object.assign(
    //       {},
    //       {
    //         category_id : category.id,
    //         category_name: category.category_name,
    //         category_types: category.Category_Types
    //         .map(category_type => {

    //              //tidy up 
    //             return Object.assign(
    //                 {},
    //                 {
    //                 type_id: category_type.id,
    //                 type_name: category_type.category_type_name,
    //                 type_img: category_type.category_type_img,
    //                 category_name: category.category_name
    //                 }
    //             )
    //             })

    //         })

    //     })


    //         if(resObj)
    //             //callback(data);
    //             res.status(200).send(messages.__GENERIC_FOUND_OBJ(resObj, Category_Types.name));
    //         else
    //             res.status(201).send(messages.__GENERIC_NOT_FOUND_OBJ(Category_Types.name));         
    //     })
    //     .catch((error) => {
    //         res.status(400).send(messages.__GENERIC_FAILURE_OBJ((error.errors ? error.errors : error.message)))
    //     }); 

    // },
    list_type(req, res, callback){
        // crud.findAll(req, res, callback, Category_Types)
        Categories.findAll({
             include: [
                 {
                 model: Category_Types
                 }
             ]
         })
         .then((categories) => {
 
       const resObj = categories.map(category => {
 
         //tidy up the category data
         return Object.assign(
           {},
           {
             category_id : category.id,
             category_name: category.category_name,
             category_types: category.Category_Types
             .map(category_type => {
 
                  //tidy up 
                 return Object.assign(
                     {},
                     {
                     type_id: category_type.id,
                     type_name: category_type.category_type_name,
                     type_img: category_type.category_type_img,
                     category_name: category.category_name
                     }
                 )
                 })
 
             })
 
         });
         let typeArr = [];
         resObj.forEach(category => {
            category.category_types.forEach(category_type => {
                let obj =  
                    {
                    type_id: category_type.type_id,
                    type_name: category_type.type_name,
                    type_img: category_type.type_img,
                    category_name: category.category_name
                    } 
                    typeArr.push(obj);
            })
            
            console.log(category.category_types);
         });
 
       
         })
         .catch((error) => {
             res.status(400).send(messages.__GENERIC_FAILURE_OBJ((error.errors ? error.errors : error.message)))
         }); 
 
    },
    list_mdr(req, res, callback){
        // crud.findAll(req, res, callback, Category_Types)
        Category_Types.findAll({
             include: [
                 {
                 model: MDRs
                 }
             ]
         })
         .then((categories) => {
 
            const resObj = categories.map(category_type => {
 
                console.log(category_type);
                //tidy up the category data
                return Object.assign(
                  {},
                  {
                    category_type_id : category_type.id,
                    category_type_name: category_type.type_name,
                    category_type_img: category_type.category_type_img,
                    mdrs: category_type.MDRs
                    .map(mdr => {
        
                         //tidy up 
                        return Object.assign(
                            {},
                            {
                           
                            mdr_id: mdr.id,
                            mdr_name: mdr.title,
                            short_description: mdr.short_description,
                            long_description: mdr.long_description,
                            type_name: category_type.category_type_name, 

                            }
                        )
                        })
        
                    })
        
                });

        res.send(resObj);
             
         })
         .catch((error) => {
             res.status(400).send(messages.__GENERIC_FAILURE_OBJ((error.errors ? error.errors : error.message)))
         }); 
 
    },
    findById(req, res, callback){
        crud.findById(req, res, callback, Category_Types)
    },
    update(req, res, callback){
        crud.update(req, res, callback, Category_Types) 
    },
    bulkCreate(req, res, callback) {
        crud.bulkCreate(req, res, callback, Category_Types)
    },
    delete(req, res, callback) {
        crud.delete({
            where: {
              id: req.body.id
            }}, res, callback, Category_Types)
    },
    findByForeignKey(req, res, callback){
        crud.findByForeignKey({
            where: {
              category_id: req.params.id
        }}, res, callback, Category_Types)  
    }
};