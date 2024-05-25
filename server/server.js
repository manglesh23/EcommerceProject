require("dotenv").config();
let express = require("express");
let cors=require('cors');
let router = require("./auth-router/router");
let { connectDB } = require("./databaseConnection/db");
let app = express();



let corsOptions = {
  origin: 'http://localhost:5173',
  // optionsSuccessStatus: 200,
  methods:'POST,GET,PUT,MATCH,DELETE,HEAD',
  credentials:true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use("/", router);

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log("Listining to the port 8000");
    });
  })
  .catch((e) => {
    console.log("faield");
    return {
      error: true,
      details: e,
    };
  });
