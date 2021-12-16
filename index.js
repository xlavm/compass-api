const express = require("express");
const router = require("./api/server");
const { port, baseUrl } = require("./config");
const logger = require("./api/helpers/logger");
const app = express();

router(app);
app.listen(port, () => {
  logger.log(`'COMPASS API Server' running in ${baseUrl}:${port}`);
});

module.exports = app;
