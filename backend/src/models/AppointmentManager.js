const AbstractManager = require("./AbstractManager");

class AppointmentManager extends AbstractManager {
  constructor() {
    super({ table: "appointment" });
  }

  async getAllAppointments(userId) {
    const [result] = await this.database.query(
      `select * from ${this.table} 
      JOIN meeting ON meeting.appointmentId = ${this.table}.id
      WHERE meeting.userId = ?`,
      [userId]
    );

    return result;
  }
}

module.exports = AppointmentManager;
