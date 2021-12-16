const express = require("express");
const router = require("../../server");
const { port } = require("../../../config");

const app = express();
var conn;
router(app);

const connect = async function() {
    return conn = app.listen(port);
};
const disconnect = async function() {
  return conn.close();
};

module.exports = { connect, disconnect};
