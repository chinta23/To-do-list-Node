// var userController = require('../controllers/userController.js'),
//var categoryController = require('../controllers/categoryController'),
  //  categoryTypeController = require('../controllers/typeController'),
    //iconController = require('../controllers/iconController'),
    //mdrController = require('../controllers/mdrController'),
    adminController = require('../controllers/adminController'),

    faqController = require('../controllers/faqController'),
    project_summaryController = require('../controllers/project_summaryController'),
  //  pageController = require('../controllers/pageController')
    userController = require('../controllers/userController');
//upload = require('../generic/upload');

const prefix= '/api';

 
module.exports = function(app){



app.get(prefix+'/faq', faqController.list);
app.get(prefix+'/faq/:id', faqController.findById);
app.delete(prefix+'/faq',  faqController.delete);
app.post(prefix+'/faq', faqController.create);
app.put(prefix+'/faq',  faqController.update);
app.get(prefix+'/faq/mdrtype/:id', faqController.findByMdrTypeId);
app.post(prefix+'/faq/moveup', faqController.moveUp);
app.post(prefix+'/faq/movedown', faqController.moveDown);

app.get(prefix+'/project_summary', project_summaryController.list);
app.get(prefix+'/project_summary/:id', project_summaryController.findById);
app.delete(prefix+'/project_summary',  project_summaryController.delete);
app.post(prefix+'/project_summary', project_summaryController.create);
app.put(prefix+'/project_summary',  project_summaryController.update);
app.get(prefix+'/project_summary/mdrtype/:id', project_summaryController.findByMdrTypeId);
app.post(prefix+'/project_summary/moveup', project_summaryController.moveUp);
app.post(prefix+'/project_summary/movedown', project_summaryController.moveDown);



app.get(prefix+'/admin/type', adminController.list_type);
app.get(prefix+'/admin/mdr', adminController.list_mdr);


app.post(prefix+'/user/auth', userController.auth);

}


  