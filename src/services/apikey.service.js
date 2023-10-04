"use strict";

const apikeyModel = require("../models/apikey.model");
const crypto = require("crypto");

const findById = async (key) => {
  console.log("key::", key);
  //   const newKey = await apikeyModel.create({
  //     key: crypto.randomBytes(64).toString("hex"),
  //     permissions: ["0000"],
  //   });
  //   console.log("newKey::", newKey);
  const objkey = await apikeyModel.findOne({ key, status: true }).lean();
  console.log("objkey::", objkey);
  return objkey;
};

module.exports = {
  findById,
};
