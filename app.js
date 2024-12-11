const express = require ("express");
const bodyParser = require ("body-parser");
const cors =require("cors");
const sequelize=require("./config/db");
const menuRoutes =require("./routes/menu");

const app =express();
app.use(cors());
app.use(bodyParser.json());

//Synchroniser avec la base de données
sequelize.sync().then(()=>{
    console.log("Database synced");
});

//routes
app.use("/menu",menuRoutes);

const PORT =5001;
app.listen(PORT,()=>console.log('Server running on port ${PORT'));