const express = require("express");

const router = express.Router();

const { hashPassword, verifyToken } = require("./services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const appointmentControllers = require("./controllers/appointmentControllers");
const coWorkerControllers = require("./controllers/coWorkerControllers");
const meetingControllers = require("./controllers/meetingControllers");
const userControllers = require("./controllers/userControllers");

router.post("/user/login", userControllers.login);
router.post("/user/signin", hashPassword, userControllers.signin);
/* ************************************************************************* */

router.use(verifyToken);
router.get("/user/userbytoken", userControllers.getByToken);
router.get("/user/checkExistence", userControllers.checkExistence);
router.get(
  "/appointment/Allappointments/:id",
  appointmentControllers.getAllAppointments
);
router.get(
  "/appointment/appointmentSelected/:id",
  appointmentControllers.getAppointmentSelected
);

router.get("/meeting/membersMeeting/:id", meetingControllers.getMembersMeeting);
router.get("/coworkers/list/:id", coWorkerControllers.getCoworkersList);
router.get(
  "/coworkers/listAttente/:id",
  coWorkerControllers.getCoworkersAttente
);

router.post("/appointment/create", appointmentControllers.create);
router.post("/meeting/create", meetingControllers.create);
router.post(
  "/coworker/createNewCoworker",
  coWorkerControllers.createNewCoworker
);

router.put("/appointment/modify/:id", appointmentControllers.update);
router.put(
  "/coworker/update/:workerId/:coworkerId",
  coWorkerControllers.update
);

router.delete("/appointment/:id", appointmentControllers.destroy);
router.delete("/meeting/:id", meetingControllers.destroy);
router.delete(
  "/coworkers/delete/:workerId/:coworkerId",
  coWorkerControllers.destroy
);

module.exports = router;
