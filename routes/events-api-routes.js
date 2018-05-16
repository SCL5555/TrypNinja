// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/events", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.AUserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Event.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // Get route for retrieving a single event
  app.get("/api/events/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Event.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // POST route for saving a new event
  app.post("/api/events", function(req, res) {
    console.log("in Post");
    db.Event.create(req.body).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });


  // DELETE route for deleting events
  app.delete("/api/events/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  // PUT route for updating events
  app.put("/api/events", function(req, res) {
    db.Event.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });
};
