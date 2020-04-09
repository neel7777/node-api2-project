const express = require("express");

const postsRouter = require("./data/router.js"); // <-----=====

const server = express();

server.use(express.json());

server.use("/api/posts", postsRouter); // <--------=============

// test it by making a GET request to localhost:4000/api/hubs

server.get("/", (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
