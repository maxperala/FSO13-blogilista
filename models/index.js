const Blog = require("./Blog");
const User = require("./User");

Blog.belongsTo(User);
User.hasMany(Blog);

User.sync({ alter: true });
Blog.sync({ alter: true });


module.exports = { Blog, User };
