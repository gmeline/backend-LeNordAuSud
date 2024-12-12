const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); 

const MenuItem = sequelize.define("MenuItem", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = MenuItem;
