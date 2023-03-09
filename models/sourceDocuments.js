const { connect } = require("../startup/db");

const orderBy = " order by caixa, material, lote;";
const sqlTable = "SELECT * FROM tb_envelopes ";

function getComplementoType(type) {
  const complemento =
    type === "cml"
      ? " and caixa=? and material=? and lote=?"
      : type === "cm"
      ? " and caixa=? and material=?"
      : type === "cl"
      ? " and caixa=? and lote=?"
      : type === "ml"
      ? " and material=? and lote=?"
      : type === "c"
      ? " and caixa=?"
      : type === "m"
      ? " and material=?"
      : type === "l"
      ? " and lote=?"
      : "";
  return complemento;
}

async function selectSourceDocuments(projeto, param1, param2, param3, type) {
  const complementoType = getComplementoType(type);
  const sql =
    sqlTable +
    "WHERE projeto=? " +
    complementoType +
    orderBy;

  const conn = await connect();
  const [rows] = await conn.query(sql, [projeto, param1, param2, param3]);
  return rows;
}

module.exports = {
  selectSourceDocuments,
};
