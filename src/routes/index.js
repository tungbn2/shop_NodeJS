'use strict';

const express = require('express');
const router = express.Router();

// set routes
router.use("/v1/api", require("./access"));

module.exports = router;