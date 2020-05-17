const infoData = require("../database/infos.json");

module.exports = (req, res) => {
  res.json(infoData.infos.filter((infos) => infos.name === req.user.name));
};
