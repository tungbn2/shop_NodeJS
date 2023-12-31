"use strict";

const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
  static createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {
      const tokens = await keytokenModel.create({
        user: userId,
        publicKey,
        privateKey,
      });

      return tokens ? tokens : null;
    } catch (error) {}
  };
}

module.exports = KeyTokenService;
