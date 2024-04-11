"use strict";
require("dotenv").config();

// Importing required modules
const compression = require("compression");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const logMiddleware = require("./middleware/logMiddleware.js");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const sanitizeBody = require("./middleware/sanitizeBody.js");
const sanitizeMongo = require("express-mongo-sanitize");
const authRouter = require("./routes/authRouter.js");
const imagesRouter = require("./routes/imagesRouter.js")
const employeeRouter = require("./routes/employeeRouter.js");
const userRouter = require("./routes/userRoutes.js");
const Grid = require("gridfs-stream")


// Creating Express app
const app = express();

let gfs; 


const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});


// Middleware setup
app.use(compression()); // Compression middleware for responses
app.use(helmet()); // Helmet middleware for setting secure HTTP headers
app.use(sanitizeMongo()); // Sanitize MongoDB queries to prevent injection attacks
app.use(cors({ origin: "*" })); // CORS middleware for cross-origin requests
app.use(express.json()); // Parsing JSON request bodies
app.use(morgan("tiny")); // Morgan middleware for logging HTTP requests

// Session management setup
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET, // Secret used to sign session ID cookie
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // Cookie expiration time (7 days)
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL, // MongoDB URL for storing session data
    }),
  })
);

// Passport initialization for authentication
app.use(passport.initialize());
app.use(passport.session());

// Custom log middleware
app.use(logMiddleware);

// Default route
app.get("/", (_req, res) => {
  res.send("Welcome API");
});

// Route handlers for authentication
app.use("/auth", authRouter);

// Route handlers for user-related endpoints
app.use("/api", sanitizeBody, userRouter);

app.use("/api/images", sanitizeBody, imagesRouter);

//
app.get("api/images/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("api/images/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

//

// Route handlers for employee-related endpoints
app.use("/api/employee", sanitizeBody, employeeRouter);



// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
