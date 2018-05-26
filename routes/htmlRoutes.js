require('dotenv').config();
const express = require('express');
var router = express.Router();
var multer = require('multer');
var cloudinaryStorage = require('multer-storage-cloudinary')
var db = require("../models");
var cloudinary = require("cloudinary")
cloudinary.config({
    cloud_name: 'tryp-ninja',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
  }
);
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: '',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, Date.now().toString());
  }
});

var parser = multer({ storage: storage });

router.post('/S3', parser.single('selectedFile'), function (req, res) {
    console.log(req.file);
    db.Moment.create({
      moment: req.file.public_id, 
      isPhoto: 1,
      caption: req.body.caption,
      EventId: req.body.storyId
    }).then(function(dbEvent) {
      console.log("dataValues updatedAt: ", dbEvent.dataValues.updatedAt);
      console.log("dataValues EventId: ", dataValues.EventId);
      res.json(dbEvent);
    });
});


module.exports = {router, db}