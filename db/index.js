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
    allowNull: true
  },
  species: {
    type: Sequelize.STRING,
    allowNull: true
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Owner = db.define("owners", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  location: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// sorry, this is wrong --> Pet.hasOne(Owner), look at seq docs (https://sequelize.org/master/manual/assocs.html);
Owner.hasMany(Pet);
Pet.belongsTo(Owner);

// const Basil = Pet.build({});

module.exports = { db, Pet, Owner };
