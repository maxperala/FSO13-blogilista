const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User);
User.hasMany(Blog);
Blog.sync({ alter: true });
User.sync({ alter: true });

module.exports = { Blog, User };
