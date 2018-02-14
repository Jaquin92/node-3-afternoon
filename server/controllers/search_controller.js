const swag = require("../models/swag");

module.exports = {
  search(req, res, next) {
    const { category } = req.query;
    let search = swag.filter(swag => swag.category === category);

    console.log(search);

    if (search.length > 0) {
      res.status(200).send(search);
    } else {
      res.status(200).send(swag);
    }
  }
};
