const { Router } = require("express");
const {
  InvalidUserDataError,
  UserNotFoundError,
  InvalidCredentialsError,
  InvalidAPIRequest,
} = require("../utils/errors");
const { User, Blog } = require("../models/index");
const { userExtractor } = require("../utils/middleware");

const userRouter = new Router();

userRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.username || !body.name) {
      throw new InvalidUserDataError();
    }
    const newUser = User.build(body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["userId", "author"] },
      },
    });
    res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      include: {
        model: Blog,
        attributes: { exclude: ["userId", "author"] },
      },
    });
    if (!user) throw new UserNotFoundError();
    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

userRouter.put("/:username", userExtractor, async (req, res, next) => {
  try {
    const username = req.params.username;
    if (req.user.username !== username) {
      throw new InvalidCredentialsError();
    }
    const body = req.body;

    if (!body.name) {
      throw new InvalidAPIRequest();
    }
    const userObj = await User.findOne({
      where: {
        username: username,
      },
    });
    userObj.name = body.name;
    await userObj.save();
    res.status(200).json(userObj);
  } catch (e) {
    next(e);
  }
});

module.exports = { userRouter };
