const express = require("express");
const morgan = require("morgan");
const models = require("./db");

models.db.authenticate().then(() => {
  console.log("We are authenticated");
});

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.static(__dirname + "public"));
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello world :)!!!");
});

const init = async () => {
  await models.Pet.sync({ force: true });
  await models.Owner.sync({ force: true });
  console.log("We are synced");
};

init();

// LISTENING
const PORT = 5050;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
