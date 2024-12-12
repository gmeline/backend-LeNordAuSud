const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("LeNordAuSud_db", "root", "root", {
  host: "127.0.0.1",
  dialect: "mariadb",
});

// Authentification de la connexion
sequelize.authenticate()
  .then(() => console.log("Connected to MariaDB"))
  .catch((err) => console.error("Unable to connect to MariaDB:", err));

module.exports = sequelize; 
