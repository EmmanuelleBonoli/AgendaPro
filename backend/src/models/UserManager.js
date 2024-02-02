const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create({
    lastName,
    firstName,
    email,
    hashedPassword,
    image,
    enterprise,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (lastName, firstName, email, hashed_password, image, enterprise) values (?,?,?,?,?,?)`,
      [lastName, firstName, email, hashedPassword, image, enterprise]
    );

    return result;
  }

  async getByEmail(email) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );
    return result;
  }

  // The Rs of CRUD - Read operations
  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }

  async checkExistence({ inputName, inputFirstName, inputEmail }) {
    const [result] = await this.database.query(
      `select * from ${this.table} where lastName = ? AND firstName = ? AND email = ?`,
      [inputName, inputFirstName, inputEmail]
    );
    return result;
  }
}

module.exports = UserManager;
