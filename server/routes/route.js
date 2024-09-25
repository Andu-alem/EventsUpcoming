const express = require('express')
const router = express.Router()
const Events = require('../models/model')
const fs = require('fs');
const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/assets/")
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})
const upload = multer({ storage : storage })


router.get('/fetch-event', (req, res) => {
	Events.find().sort({startingDate: -1}).then(items => res.json(items));
})

router.post('/create-event', upload.single('image'), async (req, res) => {
	console.log(req.body,req.file)
	let {title, description, startingDate} = req.body
	console.log('title',title,'description',description,'startingDate',startingDate)
	const event = Events({
		title,
		description,
		startingDate: new Date(startingDate),
		imgURL: `assets/example.jpg`
	});
	event.save().then(data => {
		res.json(data);
	}).catch(err => {
		//if things go wrong
		res.json({message: err});
	});

})

module.exports = router