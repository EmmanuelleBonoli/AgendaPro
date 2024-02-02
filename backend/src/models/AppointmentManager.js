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

  async getAppointmentSelected(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} 
      WHERE ${this.table}.id = ?`,
      [id]
    );
    return result;
  }

  async create({
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
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (dateStart, hourStart, minuteStart, hourFinish, minuteFinish, dateFinish, category, place, commentary, title) values (?, ?, ?, ?, ?, ?, ?, ?,?, ?)`,
      [
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
      ]
    );

    return result;
  }

  async update({
    id,
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
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET dateStart=?, hourStart=?, minuteStart=?, hourFinish=?, minuteFinish=?, dateFinish=?, category=?, place=?, commentary=?,title=? WHERE id=?`,
      [
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
        id,
      ]
    );
    return result;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }
}

module.exports = AppointmentManager;
