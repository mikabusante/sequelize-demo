const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/team-pets");

// new model --> CREATE TABLE
const Pet = db.define("pets", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  species: {
    type: Sequelize.STRING,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Owner = db.define("owners", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  location: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Owner.hasMany(Pet);
Pet.hasOne(Owner);

// const Basil = Pet.build({})

module.exports = { db, Pet, Owner };
