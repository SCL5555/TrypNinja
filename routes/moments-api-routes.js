// Requiring our models
const axios = require('axios');
const express = require('express');
var router = express.Router();
var db = require("../models");

// Routes
// =============================================================


  // GET route for getting all of the posts
  router.get("/api/moments", function(req, res) {
    var query = {};
    if (req.query.event_id) {
      query.EventId = req.query.event_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Event
    db.Moment.findAll({
      where: query,
      include: [db.Event]
    }).then(function(dbMoment) {
      res.json(dbMoment);
    });
  });

  // Get route for retrieving a single post
  router.get("/api/posts/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Event
    db.Moment.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Event]
    }).then(function(dbMoment) {
      res.json(dbMoment);
    });
  });

  // POST route for saving a new moment
  router.post("/api/moments", function(req, res) {
    db.Moment.create(req.body).then(function(dbEvent) {
      res.json(dbMoment);
    });
  });

  // DELETE route for deleting moment
  router.delete("/api/moments/:id", function(req, res) {
    db.Moment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbMoment) {
      res.json(dbMoment);
    });
  });

  // PUT route for updating moments
  router.put("/api/moments", function(req, res) {
    db.Moment.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbMoment) {
      res.json(dbMoment);
    });
  });

    //route to get the open events for a user and first moment for thumbnail display
  //using on StoryList.js
  router.get("/moment/:id", function(req, res){
    console.log("moment db call");
    db.Moment.findAll({
      where: {
        EventId: req.params.id
      },
      order: [['updatedAt', 'ASC']],
      
    }).then(function(dbEvent){
      console.log(dbEvent);
      res.json(dbEvent);
    });
});

  module.exports = {router, db};
