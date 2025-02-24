const { Router } = require("express");
const {
  BlogNotFoundError,
  UserNotFoundError,
  InvalidAPIRequest,
} = require("../utils/errors");
const { UserBlogs } = require("../models/index");
const { userExtractor } = require("../utils/middleware");
const listRouter = new Router();
listRouter.use(userExtractor);

listRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.blogId) throw new BlogNotFoundError();
    if (!body.userId) throw new UserNotFoundError();
    const newRelation = UserBlogs.build(body);
    await newRelation.save();
    res.status(201).json(newRelation);
  } catch (e) {
    next(e);
  }
});

listRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (body.read === undefined || !id) throw new InvalidAPIRequest();
    const blogInListEntry = await UserBlogs.findOne({
      where: {
        blogId: id,
      },
    });
    if (!blogInListEntry) {
      throw new BlogNotFoundError();
    }
    if (blogInListEntry.userId != req.user.id) {
      throw new InvalidAPIRequest();
    }
    blogInListEntry.read = body.read;
    await blogInListEntry.save();

    res.status(201).json(blogInListEntry);
  } catch (e) {
    next(e);
  }
});

module.exports = { listRouter };
