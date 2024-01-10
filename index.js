const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/learning-mongoDB");
  console.log("mongodb connection established on port 27017");
}

main().catch((err) => console.log(err));

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,PUT,POST,DELETE,OPTION",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);

app.use(express.json());

app.listen(4000);

app.get("/", (req, res) => res.send("hello world"));

require("./handlers/clients/clients")(app);
require("./handlers/auth/login")(app);
require("./handlers/auth/logout")(app);
require("./handlers/auth/signup")(app);
require("./handlers/products/products")(app);
require("./handlers/products/products.dashboard")(app);
