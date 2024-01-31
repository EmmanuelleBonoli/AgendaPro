const tables = require("../tables");

const getAllAppointments = async (req, res, next) => {
  try {
    const result = await tables.appointment.getAllAppointments(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllAppointments,
};
