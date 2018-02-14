const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const checkForSession = require("./middleware/checkForSession");
const swag_controller = require("./controllers/swag_controller");
const {
  login,
  register,
  signout,
  getUser
} = require("./controllers/auth_controller");
require("dotenv").config();
const { search } = require("./controllers/search_controller");
const { add, destroy, checkout } = require("./controllers/cart_controller");

const app = express();

app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(checkForSession);

app.get("/api/swag", swag_controller.read);

app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/signout", signout);
app.get("/api/user", getUser);

app.post("/api/cart", add);
app.post("/api/cart/checkout", checkout);
app.delete("/api/cart", destroy);

app.get("/api/search", search);

const port = 3000;
app.listen(port, () => console.log(`Port:${port}`));
