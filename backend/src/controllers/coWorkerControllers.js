const tables = require("../tables");

const getCoworkersList = async (req, res, next) => {
  try {
    const result = await tables.coworker.getCoworkersList(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const getCoworkersAttente = async (req, res, next) => {
  try {
    const result = await tables.coworker.getCoworkersAttente(req.params.id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const createNewCoworker = async (req, res, next) => {
  const newCoworker = {
    workerId: req.body.workerId,
    coworkerId: req.body.coworkerId,
    askingCoworker: req.body.askingCoworker,
    autorisation: req.body.autorisation,
  };

  try {
    const insertId = await tables.coworker.create(newCoworker);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  const { askingCoworker, autorisation } = req.body;
  const updatedCoworker = {
    workerId: req.params.workerId,
    coworkerId: req.params.coworkerId,
    askingCoworker,
    autorisation,
  };
  try {
    const result = await tables.coworker.update(updatedCoworker);
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { workerId, coworkerId } = req.params;
    const result = await tables.coworker.delete({ workerId, coworkerId });
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCoworkersList,
  getCoworkersAttente,
  createNewCoworker,
  update,
  destroy,
};
