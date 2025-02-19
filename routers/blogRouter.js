const { Router } = require("express");
const { Blog } = require("../models/index");
const { InvalidAPIRequest, BlogNotFoundError } = require("../utils/errors");
const blogRouter = new Router();

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.status(200).json(blogs);
  } catch (e) {
    next(e);
  }
});

blogRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    if (!data.title || !data.url)
      throw new InvalidAPIRequest("Please provide all parameters");
    const newBlog = Blog.build(data);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (e) {
    next(e);
  }
});

blogRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    if (!blog) {
      throw new BlogNotFoundError();
    }
    await blog.destroy();
    res.status(200).send();
  } catch (e) {
    next(e);
  }
});

blogRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (!id || body.likes === undefined || isNaN(body.likes)) {
      throw new InvalidAPIRequest("Please provide a ID and amount of likes!");
    }
    const blog = await Blog.findByPk(id);
    if (!blog) throw new BlogNotFoundError();
    blog.likes = body.likes;
    await blog.save();
    res.status(200).send();
  } catch (e) {
    next(e);
  }
});

module.exports = { blogRouter };
