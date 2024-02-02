const tables = require("../tables");

const getAllAppointments = async (req, res, next) => {
  try {
    const result = await tables.appointment.getAllAppointments(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const getAppointmentSelected = async (req, res, next) => {
  try {
    const result = await tables.appointment.getAppointmentSelected(
      req.params.id
    );
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const appointment = {
    dateStart: req.body.dateStart,
    hourStart: req.body.hourStart,
    minuteStart: req.body.minuteStart,
    hourFinish: req.body.hourFinish,
    minuteFinish: req.body.minuteFinish,
    dateFinish: req.body.dateFinish,
    category: req.body.category,
    place: req.body.place,
    commentary: req.body.commentary,
    title: req.body.title,
  };

  try {
    // Insert the item into the database
    const insertId = await tables.appointment.create(appointment);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const update = async (req, res, next) => {
  const {
    dateStart,
    hourStart,
    minuteStart,
    hourFinish,
    minuteFinish,
    dateFinish,
    category,
    place,
    commentary,
    title,
  } = req.body;
  const updatedAppointment = {
    id: req.params.id,
    dateStart,
    hourStart,
    minuteStart,
    hourFinish,
    minuteFinish,
    dateFinish,
    category,
    place,
    commentary,
    title,
  };
  try {
    const existingAppointment = await tables.appointment.getAppointmentSelected(
      req.params.id
    );
    if (existingAppointment == null) {
      res.status(404).send("Appointment not found");
    } else {
      const result = await tables.appointment.update(updatedAppointment);
      res.status(200).json({ result });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.appointment.delete(req.params.id);
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAppointments,
  create,
  update,
  destroy,
  getAppointmentSelected,
};
