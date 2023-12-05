const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Constants
const PORT = 8082;
const corsOptions = {
  origin: [
    "http://0.0.0.0:8080",
    "http://0.0.0.0:8081",
    "http://0.0.0.0:8083",
    "http://localhost:3001",
  ],
  credentials: true,
};

// App
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors(corsOptions));