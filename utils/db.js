const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });
  const migrations = await migrator.up();
  console.log("Migrations done", {
    files: migrations.map((mig) => mig.name),
  });
};

const connect = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log("Connected to DB");
  } catch (e) {
    console.error(e);
    return process.exit(1);
  }
  return null;
};

module.exports = { sequelize, connect };
