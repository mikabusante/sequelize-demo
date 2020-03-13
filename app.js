const express = require("express");
const morgan = require("morgan");
const models = require("./db");
const Pet = require("./db").Pet;

models.db.authenticate().then(() => {
  console.log("We are authenticated");
});

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.static(__dirname + "public"));
// body parser
app.use(express.urlencoded({ extended: false }));

// ROUTES
// example of how you'd use a routes file
// app.use("/pet", require("./routes/petRoutes"));

app.get("/", async (req, res) => {
  const allPets = await Pet.findAll();
  console.log("allPets", allPets);
  res.send(allPets);
});

// GET pet by id
app.get("/pet/:id", async (req, res) => {
  const petId = req.params.id;

  const foundPet = await Pet.findOne({
    where: {
      id: petId
    }
  });

  res.send(foundPet); // something will be here
});

//POST
// POST a new pet
app.post("/", async (req, res, next) => {
  try {
    const name = req.body.name;
    const age = req.body.age;
    const species = req.body.species;
    const color = req.body.color;

    const newPet = await Pet.create({
      name: name,
      age: age,
      species: species,
      color: color
    });

    res.send(newPet);
  } catch (err) {
    next(err);
  }
});
// POST a new owner

// PUT
// Edit a pets information given their id

// DELETE
// Delete a pet :(

const init = async () => {
  await models.Pet.sync({ force: false });
  await models.Owner.sync({ force: false });
  console.log("We are synced");
};

init();

// LISTENING
const PORT = 5050;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
