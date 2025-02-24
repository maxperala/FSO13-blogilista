const { Router } = require("express");
const {
  InvalidCredentialsError,
  AccountDisabledError,
} = require("../utils/errors");
const { User, Session } = require("../models/index");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

const loginRouter = new Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const user = req.body;
    if (!user.username || user.password != "salasana")
      throw new InvalidCredentialsError();
    const foundUser = await User.findOne({
      where: {
        username: user.username,
      },
    });
    if (!foundUser) throw new InvalidCredentialsError();
    if (foundUser.disabled) {
      throw new AccountDisabledError();
    }
    const userForToken = {
      username: foundUser.username,
      name: foundUser.name,
    };
    const token = jwt.sign(userForToken, SECRET, { expiresIn: 600000 });
    const s = Session.build({ token });
    await s.save();
    res
      .status(200)
      .send({ token, username: foundUser.username, name: foundUser.name });
  } catch (e) {
    next(e);
  }
});

module.exports = { loginRouter };
