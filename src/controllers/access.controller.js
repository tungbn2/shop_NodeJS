"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    // try {
    // return res.status(201).json(await AccessService.signUp(req.body));
    // } catch (error) {
    //   next(error);
    // }

    new CREATED({
      message: "registed!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };
}

module.exports = new AccessController();
