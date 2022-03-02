import express from "express";
import { pizzas } from "../../Pizza";

const routes = express.Router();

routes.get("/all-pizzas", (req, res) => {
  res.json(pizzas);
  console.log("Pizza array here", pizzas);
});

export default routes;
