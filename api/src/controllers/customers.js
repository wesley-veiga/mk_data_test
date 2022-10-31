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

const getCustomers = (request, response) => {
  pool.query(
    "select c.id, c.name,  c.type, c.cpf_cnpj, c.rg_ie, c.registered_at, c.is_active,  t.name as team_name from customers c inner join team t on c.team = t.id order by c.name ASC",
    (error, resuts) => {
      if (error) response.status(400).send({ result: "failure" });

      response.status(200).json(resuts.rows);
    }
  );
};

const addCustomer = (request, response) => {
  const { name, isActive, team, rgIe, cpfCnpj, type } = request.body;

  const registered_at = new Date();

  pool.query("SELECT cpf_cnpj FROM customers", (error, results) => {
    const alreadyRegistered = results.rows.find((f) => f.cpf_cnpj === cpfCnpj);

    if (alreadyRegistered) {
      response
        .status(400)
        .send({ result: "failure", message: "cpf or cnpj already registered" });
    } else {
      pool.query(
        "INSERT INTO customers(name, is_active, type, cpf_cnpj, rg_ie, registered_at, team) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [name, isActive, type, cpfCnpj, rgIe, registered_at, parseInt(team)],
        (error, results) => {
          if (error) response.status(400).send({ result: "failure" });

          response.status(201).send({ result: "success" });
        }
      );
    }
  });
};

const updateCustomer = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, isActive, team, rgIe, cpfCnpj, type } = request.body;

  const updateQuery = () =>
    pool.query(
      "UPDATE customers SET name = $1, is_active = $2, type = $3, cpf_cnpj = $4, rg_ie = $5, team = $6 WHERE id = $7",
      [name, isActive, type, cpfCnpj, rgIe, team, id],
      (error, results) => {
        if (error) response.status(400).send({ result: "failure" });

        response.status(201).send({ result: "success" });
      }
    );

  pool.query(
    "SELECT cpf_cnpj FROM customers WHERE id = $1",
    [id],
    (error, results) => {
      if (cpfCnpj === results.rows[0].cpf_cnpj) {
        updateQuery();
      } else {
        pool.query("SELECT cpf_cnpj FROM customers", (error, results) => {
          const alreadyRegistered = results.rows.find(
            (f) => f.cpf_cnpj === cpfCnpj
          );

          if (alreadyRegistered) {
            response.status(400).send({
              result: "failure",
              message: "cpf or cnpj already registered",
            });
          } else {
            updateQuery();
          }
        });
      }
    }
  );

  // pool.query(
  //   "UPDATE customers SET name = $1, is_active = $2, type = $3, cpf_cnpj = $4, rg_ie = $5, team = $6 WHERE id = $7",
  //   [name, isActive, type, cpfCnpj, rgIe, team, id],
  //   (error, results) => {
  //     if (error) response.status(400).send({ result: "failure" });

  //     response.status(201).send({ result: "success" });
  //   }
  // );
};

const removeCustomer = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM customers WHERE id = $1", [id], (error, results) => {
    if (error) response.status(400).send({ result: "failure" });

    response.status(201).send({ result: "success" });
  });
};

module.exports = {
  getCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
};
