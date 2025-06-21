require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connection = require("./configs/database");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./configs/swagger");
const path = require("path");
const uploadService = require("./services/uploadService");
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require("./routes/authRoute");
const session = require("express-session");
const passport = require("passport");
require("./configs/google");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoute);

app.use("/uploads/images", express.static(path.join(__dirname, "uploads/images")));

// Mount router upload image
app.use(uploadService);


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(notFound);
app.use(errorHandler);
(async () => {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`✅ Backend Node.js App listening on port ${port}`);
    });
  } catch (error) {
    console.log("❌ Error connect to DB: ", error);
  }
})();

