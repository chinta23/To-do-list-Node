var express = require('express');
var app = express();
var mysql = require('mysql');
var router = express.Router();

var cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(cors())


var port = process.env.PORT || 3000;

app.use('/uploads/', express.static('uploads'));

app.set('view engine', 'ejs');

app.all('/*', function(req, res, next) {
	// CORS headers
	res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	// Set custom headers for CORS
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Node MySQL API!' });   
});

 
//app.use('/api', require('./app/routes/api'));
 
 //Routes
var authRoute = require('./app/routes/api.js')(app);
//app.use('/api', authRoute);
app.use('/', router);

app.use(function(req, res, next) {
	res.status(404);
	res.send({
		"status" : "FAILURE",
		"message" : 'Invalid URL'
	});
});
 

app.listen(port, ()=>{
	console.log("Server started on port", port);
});

