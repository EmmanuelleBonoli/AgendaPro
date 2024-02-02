const AbstractManager = require("./AbstractManager");

class CoworkerManager extends AbstractManager {
  constructor() {
    super({ table: "coworker" });
  }

  async getCoworkersList(userId) {
    const [result] = await this.database.query(
      `select user.firstName, user.lastName, user.enterprise, ${this.table}.coworkerId, ${this.table}.autorisation from ${this.table} 
      JOIN user ON ${this.table}.coworkerId = user.id
      WHERE ${this.table}.workerId = ?`,
      [userId]
    );
    return result;
  }

  async getCoworkersAttente(userId) {
    const [result] = await this.database.query(
      `select user.firstName, user.lastName, user.enterprise, ${this.table}.* from ${this.table} 
      JOIN user ON ${this.table}.workerId = user.id
      WHERE ${this.table}.coworkerId =?
      AND ${this.table}.askingCoworker = 0
      `,
      [userId]
    );
    return result;
  }

  async create({ workerId, coworkerId, askingCoworker, autorisation }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (workerId, coworkerId, askingCoworker, autorisation) values (?, ?, ?, ?)`,
      [workerId, coworkerId, askingCoworker, autorisation]
    );

    return result;
  }

  async update({ workerId, coworkerId, askingCoworker, autorisation }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET askingCoworker=?, autorisation=? WHERE workerId=? AND coworkerId=?`,
      [askingCoworker, autorisation, workerId, coworkerId]
    );
    return result;
  }

  async delete({ workerId, coworkerId }) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} where workerId = ? AND coworkerId= ?`,
      [workerId, coworkerId]
    );
    return result;
  }
}

module.exports = CoworkerManager;
