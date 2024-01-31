const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const user = await tables.user.getByEmail(req.body.email);

    const verified = await argon2.verify(
      user[0].hashed_password,
      req.body.password
    );

    if (verified) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user[0].hashed_password;

      const token = await jwt.sign(
        { sub: user[0].id },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        token,
        user: user[0],
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { lastName, firstName, email, hashedPassword, image, enterprise } =
      req.body;

    const result = await tables.user.create({
      lastName,
      firstName,
      email,
      hashedPassword,
      image,
      enterprise,
    });

    if (result.insertId) {
      const newUser = {
        id: result.insertId,
        lastName,
        firstName,
        email,
        hashedPassword,
        image,
        enterprise,
      };

      const token = await jwt.sign(
        { sub: newUser.id, admin: newUser.admin },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({
        token,
        firstName: newUser.firstName,
        email: newUser.email,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const getByToken = async (req, res) => {
  const userInfo = req.auth;
  try {
    if (userInfo && userInfo.sub) {
      const user = await tables.user.read(userInfo.sub);

      if (user == null) {
        res.sendStatus(404);
      } else {
        res.json(user);
      }
    } else {
      res.status(404).send("User not found. Auth doesn't exist");
    }
  } catch (e) {
    res.status(500).send(`Internal server error : ${e}`);
  }
};

module.exports = {
  login,
  signin,
  getByToken,
};
