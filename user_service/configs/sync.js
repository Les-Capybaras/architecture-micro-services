module.exports = () => {
    const User = require("../models/user");

    const syncDatabase = async () => {
      try {
        await User.sync();
        console.log("[DATABASE] - Synced database.");
      } catch (error) {
        console.error("[DATABASE] - Unable to sync database:", error);
      }
    };
    syncDatabase();
  };