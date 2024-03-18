"use strict";
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const compression = require("compression");
const sanitizeMongo = require("express-mongo-sanitize");
const morgan = require("morgan");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const helmet = require("helmet");
const { errorHandler } = require("./utils/errors");
const logMiddleware = require("./middleware/logMiddleware.js");
const authRouter = require("./routes/authRouter.js")
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes.js");
const employeeRouter = require("./routes/employeeRouter.js")
const sanitizeBody =  require("./middleware/sanitizeBody.js")



const app = express();
app.use(compression());
app.use(helmet());
app.use(sanitizeMongo());
app.use(
  cors({
    origin: process.env.CORS_WHITELIST.split(","),
  })
);
app.use(express.json());
app.use(morgan("tiny"));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logMiddleware);

app.get("/", (_req, res) => {
  res.send("Welcome API");
});



app.use("/auth", authRouter);
app.use("/api", sanitizeBody, userRouter )
app.use("/api/employee", sanitizeBody, employeeRouter  )



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
