const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getTeams = (request, response) => {
  pool.query("SELECT * FROM team ORDER BY name ASC", (error, resuts) => {
    if (error) throw error;

    response.status(200).json(resuts.rows);
  });
};

const addTeam = (request, response) => {
  const { name, isActive } = request.body;

  pool.query(
    "INSERT INTO team(name, is_active) VALUES ($1, $2)",
    [name, isActive],
    (error, results) => {
      if (error) response.status(400).send({ result: "failure" });

      response.status(201).send({ result: "success" });
    }
  );
};

const updateTeam = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, isActive } = request.body;

  pool.query(
    "UPDATE team SET name = $1, is_active = $2 WHERE id = $3",
    [name, isActive, id],

    (error, results) => {
      if (error) response.status(400).send({ result: "failure" });

      response.status(201).send({ result: "success" });
    }
  );
};

const removeTeam = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM team WHERE id = $1", [id], (error, results) => {
    if (error) response.status(400).send({ result: "failure" });

    response.status(201).send({ result: "success" });
  });
};

module.exports = {
  getTeams,
  addTeam,
  updateTeam,
  removeTeam,
};
