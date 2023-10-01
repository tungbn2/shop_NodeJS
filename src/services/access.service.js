"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
// const crypto = require("crypto");
const crypto = require("node:crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
};

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step1: check email exits
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "registered",
          message: "Shop already registered!",
        };
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });

      if (newShop) {
        // create private key, public key => su dung crypto
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });

        // const publicKeyString = await KeyTokenService.createKeyToken({
        //   userId: newShop._id,
        //   publicKey,
        //   privateKey
        // });

        // create private key, public key => su dung node:crypto
        const publicKey = crypto.randomBytes(64).toString("hex");
        const privateKey = crypto.randomBytes(64).toString("hex");

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey,
        });

        // if (!publicKeyString)
        if (!keyStore)
          return {
            code: "error key",
            message: "error key",
          };

        // const publicKeyObject = crypto.createPublicKey(publicKeyString);
        // const tokens = await createTokenPair(
        //   { userId: newShop._id, email },
        //   publicKeyObject,
        //   privateKey
        // );
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );

        console.log(`Create token susscess`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              fields: ["_id", "name", "email"],
              object: newShop,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      console.log(error);
      return {
        code: "error code",
        message: "error message",
        status: "error",
      };
    }
  };
}

module.exports = AccessService;
