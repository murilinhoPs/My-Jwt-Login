const userData = require("../database/users.json");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcrypt");

module.exports = {
  async getUsers(req, res) {
    res.json(userData.users);
  },

  async createUser(req, res) {
    try {
      const salt = await bycrypt.genSalt();

      const hashedPassword = await bycrypt.hash(req.body.password, salt);

      console.log(salt);
      console.log(hashedPassword);

      const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      };

      userData.push(user);
      res.status(201).send();
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  async authUser(req, res) {
    const user = userData.users.find((user) => user.name === req.body.name);

    if (user == null) return res.status(400).send("Usuário não encontrado.");

    try {
      if (await bycrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

        res.json({
          message: "Autenticação completa",
          accessToken: accessToken,
        });
      } else {
        res.send("Senha incorreta");
      }
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
};
