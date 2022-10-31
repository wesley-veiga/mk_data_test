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

// const connectDb = async () => {
//   try {
//     const client = new Client({
//       user: process.env.PGUSER,
//       host: process.env.PGHOST,
//       database: process.env.PGDATABASE,
//       password: process.env.PGPASSWORD,
//       port: process.env.PGPORT,
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     });

//     await client.connect();
//     await client.end();
//   } catch (error) {
//     console.log(error);
//   }
// };

// connectDb();
