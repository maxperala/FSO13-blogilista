const { Router } = require("express");
const { InvalidCredentialsError } = require("../utils/errors");
const { User } = require("../models/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const loginRouter = new Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    console.log("THIS ROUTE");
    const user = req.body;
    if (!user.username || user.password != "salasana")
      throw new InvalidCredentialsError();
    const foundUser = await User.findOne({
      where: {
        username: user.username,
      },
    });
    if (!foundUser) throw new InvalidCredentialsError();
    const userForToken = {
      username: foundUser.username,
      name: foundUser.name,
    };
    const token = jwt.sign(userForToken, SECRET);
    res
      .status(200)
      .send({ token, username: foundUser.username, name: foundUser.name });
  } catch (e) {
    next(e);
  }
});

module.exports = { loginRouter };
