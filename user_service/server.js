// Vars
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Express App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Select the env file
dotenv.config();
const PORT = process.env.API_PORT || 8080;

// Models
require("./configs/sync")();

// Routes
console.log('[EXPRESS] - Starting...');

require("./routes/auth.route")(app);

// Start server
app.listen(PORT, () => {
    console.log(`[EXPRESS] - Server listening on port ${PORT}`);
});