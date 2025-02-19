require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected successfully");
    const blogs = await sequelize.query("SELECT * FROM blogs", {
      type: QueryTypes.SELECT,
    });
    for (const blog of blogs) {
      console.log(
        `${blog.author ? blog.author : "unknown"}: '${blog.title}', ${
          blog.likes
        } likes`
      );
    }
    sequelize.close();
  } catch (e) {
    console.error("Could not connect", error);
  }
};
main();
