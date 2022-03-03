// require the express module
import express from "express";

// require the cors module
import cors from "cors";

import path from "path";
import routes from "./routes/pizzas";
import { pizzas } from "../Pizza";
// creates an instance of an Express server
const app = express();

// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

// allow POST and PUT requests to use JSON bodies
app.use(express.json());

app.use("/", routes);

// define the port
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("images"));

app.get("/", (req, res) => {
  res.render("HomePage");
});

app.get("/", (req, res) => {
  res.render("HomePage", { pizzas: pizzas });
});

app.get("/pizza-details/:name", (req, res) => {
  const pizza = pizzas.find((p) => p.name === req.params.name);
  if (pizza) {
    res.render("pizzaDetails", { pizza: pizza });
  }
});

app.get("/build-your-own", (req, res) => {
  res.render("CustomPizza");
});

app.post("/calculatePrize", (req, res) => {
  var size = req.body.size;
  var toppings = req.body.toppings;
  var glutenFree = req.body.GlutenFree ? true : false;
  var price = req.body.price;
  var toppingsSize = toppings.length;
  if (size === "small") {
    price = 7.0 + toppingsSize * 0.5;
  } else if (size === "medium") {
    price = 10.0 + toppingsSize * 1.0;
  } else if (size === "large") {
    price = 12.0 + toppingsSize * 1.25;
  }

  if (glutenFree) {
    price = price + 2;
  }

  var displayTextarea = req.body.specialPizza;
  var displayMsg = "";
  if (price >= 15) {
    displayMsg =
      "Because your order is meets the $15.00 minimum, you get FREE DELIVERY!";
  }

  res.render("DisplayPizzaOrder", {
    size,
    toppings,
    glutenFree,
    price,
    displayMsg,
    displayTextarea,
  });
});

app.get("/BuildAnotherPizza", (req, res) => {
  res.render("CustomPizza");
});

app.get("/back-to-homepage", (req, res) => {
  res.render("HomePage", { pizzas: pizzas });
});

app.get("/click-here-review", (req, res) => {
  res.render("ReviewPage");
});

app.post("/submit", (req, res) => {
  console.log("after click submit :", req.body.name);
  const name = req.body.name;
  const comment = req.body.comment;
  const rating = req.body.rating;
  res.render("DisplayReview", { name, comment, rating });
});

app.get("/neverMind", (req, res) => {
  res.redirect("/");
});

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));
