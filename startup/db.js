const mysql = require("mysql2/promise");

const db = "mysql://PDFBrasil:PDFBrasil0@54.200.26.177:3306/uq-gq-pa";

async function connect() {
  if (global.connection && global.connection.state !== "disconnected")
    return global.connection;

  const connection = await mysql.createConnection(db);
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

module.exports = { connect };
