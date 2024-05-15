const path = require ('path');
//const { fileURLToPath } = require('url');
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
const { bgCyan } = require("colors");
require("colors");
const connectDb = require("./config/config");
//dotenv config
dotanv.config();
//db config
connectDb();
//rest object
const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Định nghĩa __dirname
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));

// Static files
app.use(express.static(path.join(__dirname, './client/build')));

app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
