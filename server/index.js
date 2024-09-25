const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();

//CORS setting
//only for development environment
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	
	// authorized headers for preflight requests
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	next();

	app.options('*', (req, res) => {
		//allowed XHR methods
		res.header('Access-Control-Allow-Methods','GET, PATCH, PUT, POST, DELETE, OPTIONS');
		res.send();
	});
});
app.use('/media',express.static('public'))

//database connection
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT||5000;
mongoose.connect(DB_URI);
/*mongoose.connect("mongodb://localhost:27017/eventupdater").then(()=>{
        console.log("Connected to MongoDB");
});*/
const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname,'../client-app/dist/')))
const pageRoute = require('./routes/route')
app.use('/api', pageRoute)

//listening to the port at 5000
app.listen(PORT, ()=>{
	console.log(`Express running ${PORT}!`)
})