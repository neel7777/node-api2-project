const express = require("express");

const Posts = require("./db.js"); // update the path

const router = express.Router();

router.get("/", (req, res) => {
    Posts.find(req.query)
      .then((posts) => {
        res.status(200).json({ queryString: req.query, posts });
      })
      .catch((error) => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the posts",
        });
      });
  });
  
  router.get("/:id", (req, res) => {
    Posts.findById(req.params.id)
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "post not found" });
        }
      })
      .catch((error) => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the post",
        });
      });
  });
  
  router.post("/", (req, res) => {
    Posts.insert(req.body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error adding the hub",
        });
      });
  });
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    Posts.remove(id)
      .then((count) => {
        if (count) {
          res.status(200).json({ message: "post deleted" });
        } else {
          res.status(404).json({ message: "post not found" });
        }
      })
      .catch((err) => {
        console.log(err);
  
        res.status(500).json({ error: "something failed, sorry" });
      });
  });
  
  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    console.log("changes:", changes);
  
    Posts.update(req.params.id, changes)
      .then((count) => {
        if (count) {
          Posts.findById(req.params.id)
            .then((post) => {
              res.status(200).json(post);
            })
            .catch((err) => {
              res
                .status(500)
                .json({ errorMessage: "error reading the updated post" });
            });
        } else {
          res.status(404).json({ message: "The post could not be found" });
        }
      })
      .catch((error) => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error updating the post",
        });
      });
  });
  
  // add an endpoint that returns all the messages for a hub
  // /api/hubs/:id/messages
  router.get("/:id/comments", (req, res) => {
    Posts.findCommentById(req.params.id)
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "error reading comments" });
      });
  });
  
  // add an endpoint for adding new message to a hub
  router.post("/:id/comments", (req, res) => {
    Posts.insertComment(req.body)
      .then((message) => {
        res.status(201).json(message);
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "error adding comments" });
      });
  });

module.exports = router; // make it available for require()
