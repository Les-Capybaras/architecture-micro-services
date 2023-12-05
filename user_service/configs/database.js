const { Sequelize } = require("sequelize");

// Database connection
const user = process.env.POSTGRES_USER;
const pwd = process.env.POSTGRES_PASSWORD;
const db = process.env.POSTGRES_DB;

  const sequelize = new Sequelize(db, user, pwd, {
    host: "database", // Docker Service Name
    dialect: "postgres",
    logging: false // Remove if SQL logs are wanted
  });

  // Test connection to database
  async function testAuthenticate() {
    try {
      await sequelize.authenticate();
      console.log("[DATABASE] - Connection has been established successfully.");
    } catch (error) {
      console.error("[DATABASE] - Unable to connect to the database", error);
    }
  }

  testAuthenticate();

module.exports = sequelize