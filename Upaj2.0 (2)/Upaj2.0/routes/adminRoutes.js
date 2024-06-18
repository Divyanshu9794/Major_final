const express = require("express");
const path = require("path");
const auth = require("../middlewares/auth");
const { signin } = require("../controllers/adminController");
const newExpertController = require("../controllers/newExpertController");
const allTicketsController = require("../controllers/allTicketController");
const adminRouter = express.Router();

adminRouter.use(
  express.static(path.join(__dirname, "..", "public", "..", "html"))
);

adminRouter.get("/", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "adminHome.html"));
});
adminRouter.get("/addExpert", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "addExpert.html"));
});

adminRouter.get("/auth", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "adminAuth.html"));
});

adminRouter.get("/chat", auth, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "html", "chat.html"));
});

adminRouter.post("/addExpert", newExpertController);
adminRouter.get("/getallTickets", allTicketsController);
adminRouter.post("/signin", signin);

module.exports = adminRouter;
