const AbstractManager = require("./AbstractManager");

class MeetingManager extends AbstractManager {
  constructor() {
    super({ table: "meeting" });
  }
}

module.exports = MeetingManager;
