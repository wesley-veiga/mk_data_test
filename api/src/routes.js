const { Router } = require("express");
const team = require("./controllers/team");
const customers = require("./controllers/customers");

const routes = Router();

routes.get("/teams", team.getTeams);
routes.post("/team", team.addTeam);
routes.put("/team/:id", team.updateTeam);
routes.delete("/team/:id", team.removeTeam);

routes.get("/customers", customers.getCustomers);
routes.post("/customer", customers.addCustomer);
routes.put("/customer/:id", customers.updateCustomer);
routes.delete("/customer/:id", customers.removeCustomer);

module.exports = routes;
