const express = require("express");
const path = require("path");
const { signup, signin } = require("../controllers/userController");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const newTicketController = require("../controllers/newTicketController");
const deleteTicketController = require("../controllers/deleteTicketController");
const allTicketsController = require("../controllers/allTicketController");
const closeTicketController = require("../controllers/closeTicketController");

const predict = require("../middlewares/predict");

userRouter.use(
  express.static(path.join(__dirname, "..", "public", "..", "html"))
);

userRouter.get("/", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "userHome.html"));
});
userRouter.get("/predictionForm", auth, (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "html", "predictionForm.html")
  );
});

userRouter.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "userAuth.html"));
});
userRouter.get("/app", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "chat.html"));
});

userRouter.post("/newTicket", auth, predict, newTicketController);
userRouter.delete("/delticket/:id", auth, deleteTicketController);
userRouter.put("/closeTicket/:id", auth, closeTicketController);
userRouter.get("/getallTickets", auth, allTicketsController);
userRouter.post("/signup", signup);

userRouter.post("/signin", signin);

module.exports = userRouter;
