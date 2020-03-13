const { Pet, Owner, db } = require("./db");

const seed = async () => {
  await db.sync({ force: true });

  const pets = await Promise.all([
    Pet.create({
      name: "Basil",
      age: 2,
      species: "dog",
      color: "white and brown"
    }),
    Pet.create({
      name: "Ollie",
      age: 1,
      species: "dog",
      color: "grey"
    }),
    Pet.create({
      name: "Sampson",
      age: 8,
      species: "dog",
      color: "white and black"
    }),
    Pet.create({
      name: "Hudson",
      age: 8,
      species: "cat",
      color: "black"
    })
  ]);

  const owners = await Promise.all([
    Owner.create({
      name: "Mika",
      location: "the internet"
    }),
    Owner.create({
      name: "Mika's Mom",
      location: "Westchester"
    }),
    Owner.create({
      name: "Casey",
      location: "the internet"
    })
  ]);

  const id = id => id - 1;

  await Promise.all(
    [owners[id(1)].addPet([pets[id(1)]]), owners[id(2)].addPet([pets[id(2)]])],
    owners[id(3)].addPet([pets[id(3)]]),
    owners[id(3)].addPet([pets[id(4)]])
  );

  console.log("DB seeded!");
};

// Remember that we aren't able to use await outside of an async function.

const runSeed = async function() {
  try {
    await seed();
  } catch (err) {
    console.log(`ERROR SEEDING: ${err.message} ${err.stack}`);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
};

runSeed();
