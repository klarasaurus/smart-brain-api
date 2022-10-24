const express = require("express"); //importerer express-pakke
const bodyParser = require("body-parser"); //importer body-parser
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors"); //importerer cors
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  version: "7.2",
  connection: {
    host: "127.0.0.1",
    user: "klaralie",
    password: "",
    database: "smart-brain-db",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express(); //lager app ved å kjøre express
app.use(bodyParser.json()); //for å bruke body-parser

// app.use(bodyParser.json());
app.use(cors()); //bruker cors

//ROUTE GET request
app.get("/", (req, res) => {
  res.send("success"); //viser suksess
});
//POST request Signin
app.post("/signin", signin.handleSignIn(db, bcrypt));
//POST request Register:
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
//GET request Profil
app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
//PUT request Image
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});
//POST request Image
app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});
app.listen(3000, () => {
  console.log("app is running on port 3000");
});
