const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User);
User.hasMany(Blog);

module.exports = { Blog, User };
