const express = require("express");
// const connection = require('./config/db');
// const cors = require('cors');
const app = express();
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
var session = require("express-session");

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(cors());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.use("/users", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error logging out: ", err);
    }
    res.status(200);
  });
});

app.get("/getUserDetail", (req, res) => {
  let data = {
    useremail: req.session.email,
    username: req.session.username,
  };
  res.status(200).json(data);
});

mongoose
  .connect(
    "mongodb+srv://admin:admin123*@cluster0.kiqq9ku.mongodb.net/?retryWrites=true&w=majority"
    // "mongodb+srv://divyanshu:<divyanshu>@atlascluster.3xqdft0.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port no. 5000...");
    });
  })
  .catch((error) => {
    console.log(error);
  });
