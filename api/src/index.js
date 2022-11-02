const { Client } = require("pg");
const dotenv = require("dotenv");
const express = require("express");
const routes = require("./routes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(routes);
app.listen(3333);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
