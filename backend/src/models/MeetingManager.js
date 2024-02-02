const AbstractManager = require("./AbstractManager");

class MeetingManager extends AbstractManager {
  constructor() {
    super({ table: "meeting" });
  }

  async getMembersMeeting(appointmentId) {
    const [result] = await this.database.query(
      `select user.firstName, ${this.table}.userId, ${this.table}.appointmentId from ${this.table} 
      JOIN user ON ${this.table}.userId = user.id
      WHERE ${this.table}.appointmentId = ?`,
      [appointmentId]
    );
    return result;
  }

  async create({ userId, appointmentId }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, appointmentId) values (?, ?)`,
      [userId, appointmentId]
    );

    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} where appointmentId = ?`,
      [id]
    );
    return result;
  }
}

module.exports = MeetingManager;
