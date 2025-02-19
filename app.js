const { PORT } = require("./utils/config");
const express = require("express");
const app = express();
const { connect } = require("./utils/db");
const { blogRouter } = require("./routers/blogRouter");
const { errorHandler } = require("./utils/middleware");

app.use(express.json());
app.use("/api/blogs", blogRouter);
app.use(errorHandler);

const launch = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.error("Failed to start server:", e);
  }
};

launch();
