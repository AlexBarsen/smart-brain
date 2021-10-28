const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");
const pg = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "barsen",
    password: "your_database_password",
    database: "smart-brain",
  },
});

const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("email", "username")
    .from("users")
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err));
});

app.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, saltRounds);
  db.transaction((trx) => {
    trx
      .insert({
        password_hash: passwordHash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            username: username,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
});

app.post("/signIn", (req, res) => {
  const { email, password } = req.body;
  db.select("email", "password_hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].password_hash);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("error loging in"));
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => console.log("unable to get entries"));
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.body;
  db("*")
    .from("users")
    .where("id", "=", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("error getting user");
      }
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
