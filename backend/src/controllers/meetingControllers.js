const tables = require("../tables");

const getMembersMeeting = async (req, res, next) => {
  try {
    const result = await tables.meeting.getMembersMeeting(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const meeting = {
    userId: req.body.userId,
    appointmentId: req.body.appointmentId,
  };
  try {
    const insertId = await tables.meeting.create(meeting);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await tables.meeting.delete(req.params.id);
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMembersMeeting,
  create,
  destroy,
};
