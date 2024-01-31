const express = require("express");

const router = express.Router();

const { hashPassword, verifyToken } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const appointmentControllers = require("./controllers/appointmentControllers");
// const coWorkerControllers = require("./controllers/coWorkerControllers");
// const meetingControllers = require("./controllers/meetingControllers");
const userControllers = require("./controllers/userControllers");

// Route to get a list of items
// router.get("/user", userControllers.browse);

// Route to get a specific item by ID
// router.get("/user/:id", userControllers.read);

// Route to add a new item
// router.post("/user", userControllers.add);
router.post("/user/login", userControllers.login);
router.post("/user/signin", hashPassword, userControllers.signin);
/* ************************************************************************* */

router.use(verifyToken);
router.get("/user/userbytoken", userControllers.getByToken);
router.get(
  "/appointment/Allappointments/:id",
  appointmentControllers.getAllAppointments
);

module.exports = router;
