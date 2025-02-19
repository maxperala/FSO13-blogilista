require("dotenv").config();
const express = require("express");
const app = express();
const { blogRouter } = require("./routers/blogRouter");

app.use(express.json());
app.use("/api/blogs", blogRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
