"use strict";

const { findById } = require("../services/apikey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    if (!key)
      return res.status(403).json({
        message: "need key!!!",
      });

    // check API key
    const objKey = await findById(key);
    if (!objKey)
      return res.status(403).json({
        message: "not find key!!!",
      });

    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "not find key!!!",
    });
  }
};

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "not have permission!!!",
      });
    }

    console.log("permission::", req.objKey.permissions);
    const validPermission = req.objKey.permissions.includes(permission);
    if (!validPermission)
      return res.status(403).json({
        message: "not have permission!!!",
      });

    return next();
  };
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = {
  apiKey,
  permission,
  asyncHandler,
};
