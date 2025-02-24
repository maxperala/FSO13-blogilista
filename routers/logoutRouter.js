const { Router } = require("express");
const { userExtractor } = require("../utils/middleware");
const { Session } = require("../models");

const logoutRouter = new Router();

logoutRouter.use(userExtractor);

logoutRouter.delete("/", async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: {
        token: req.token,
      },
    });
    await session.destroy();
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = { logoutRouter };
