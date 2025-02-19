const { Router } = require("express");
const { Blog } = require("../models/Blog");
const blogRouter = new Router();

blogRouter.get("/", async (req, res) => {
  console.log("called");
  const blogs = await Blog.findAll();
  res.status(200).json(blogs);
});

blogRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newBlog = Blog.build(data);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred creating blog");
  }
});

blogRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByPk(id);
    await blog.destroy();
    res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500).send("Error deleting blog");
  }
});

module.exports = { blogRouter };
