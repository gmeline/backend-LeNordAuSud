const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const menuRoutes = require("./routes/menu");

const app = express();

// Synchroniser la base de données avant d'écouter les requêtes
sequelize.sync()
  .then(() => {
    console.log("Database synced");

    if (process.env.NODE_ENV !== 'test') {
      const PORT = 5001;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/menu", menuRoutes);

module.exports = app;
