const { Router } = require("express");
const { Blog } = require("../models/index");
const { sequelize } = require("../utils/db");
const authorRouter = new Router();

authorRouter.get("/", async (req, res, next) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
    });
    res.status(200).json(authors);
  } catch (e) {
    next(e);
  }
});

module.exports = { authorRouter };
