const Blog = require("./Blog");
const User = require("./User");
const UserBlogs = require("./UserBlogs");
const Session = require("./Session");

Blog.belongsTo(User);
User.hasMany(Blog);

User.belongsToMany(Blog, { through: UserBlogs, as: "listed_blogs" });
Blog.belongsToMany(User, { through: UserBlogs, as: "users_listed" });

module.exports = { Blog, User, UserBlogs, Session };
