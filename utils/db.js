const { Sequelize } = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
  } catch (e) {
    console.error(e);
    return process.exit(1);
  }
  return null;
};

module.exports = { sequelize, connect };
