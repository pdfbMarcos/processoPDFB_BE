const { connect } = require("../startup/db");

const orderBy = " order by caixa, material, lote;";
const sqlTable = "SELECT * FROM tb_digitalizacao ";

function getComplementoAction(action) {
  const complemento =
    action === "dig"
      ? " and (dtCaptura is null or dtCaptura = '')"
      : action === "rep"
      ? " and (dtReprep is null or dtReprep = '') and dtCaptura is not null"
      : action === "cxs"
      ? " and (dtCaixa is null or dtCaixa = '') and dtCaptura is not null"
      : "";
  return complemento;
}

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

async function selectDocuments(projeto, param1, param2, param3, action, type) {
  const complementoAction = getComplementoAction(action);
  const complementoType = getComplementoType(type);
  const sql =
    sqlTable +
    "WHERE projeto=? " +
    complementoType +
    complementoAction +
    orderBy;
  const conn = await connect();
  const [rows] = await conn.query(sql, [projeto, param1, param2, param3]);
  return rows;
}

async function insertDocument(document) {
  try {
    const conn = await connect();
    const sql =
      "INSERT INTO tb_digitalizacao(caixa,material,lote,loteCTRL,dtPreparacao,projeto) VALUES (?,?,?,?,?,?);";
    const values = [
      document.caixa,
      document.material,
      document.lote,
      document.loteCTRL,
      document.dtPreparacao,
      document.projeto,
    ];
    return await conn.query(sql, values);
  } catch (error) {
    console.log("insertDocument => " + error);
  }
}

async function updateDocumentCxs(
  projeto,
  caixa,
  material,
  lote,
  loteCTRL,
  documento
) {
  try {
    const sql =
      "UPDATE tb_digitalizacao SET dtCaixa=? WHERE projeto=? and caixa=? and material=? and lote=? and loteCTRL=?";

    const values = [
      documento.dtCaixa,
      projeto,
      caixa,
      material,
      lote,
      loteCTRL,
    ];
    //console.log("SQL => " + sql);
    //console.log("Values => " + values);
    const conn = await connect();
    return await conn.query(sql, values);
  } catch (error) {
    console.log("updateBoxVerificationDateDocument => " + error);
  }
}

async function updateDocumentDig(
  projeto,
  caixa,
  material,
  lote,
  loteCTRL,
  documento
) {
  try {
    const conn = await connect();
    const sql =
      "UPDATE tb_digitalizacao SET lotePDF=?, qtdPag=?, doctoFP=?, dtCaptura=? WHERE projeto=? and caixa=? and material=? and lote=? and loteCTRL=?";
    const values = [
      documento.lotePDF,
      documento.qtdPag,
      documento.doctoFP,
      documento.dtCaptura,
      projeto,
      caixa,
      material,
      lote,
      loteCTRL,
    ];
    return await conn.query(sql, values);
  } catch (error) {
    console.log("updateDocument => " + error);
  }
}

async function updateDocumentRep(
  projeto,
  caixa,
  material,
  lote,
  loteCTRL,
  documento
) {
  try {
    const conn = await connect();
    const sql =
      "UPDATE tb_digitalizacao SET caixaPDF=?, qtdImg=?, dtReprep=? WHERE projeto=? and caixa=? and material=? and lote=? and loteCTRL=?";
    const values = [
      documento.caixaPDF,
      documento.qtdImg,
      documento.dtReprep,
      projeto,
      caixa,
      material,
      lote,
      loteCTRL,
    ];
    return await conn.query(sql, values);
  } catch (error) {
    console.log("updateDocumentbyLotePDF => " + error);
  }
}

module.exports = {
  insertDocument,
  selectDocuments,
  updateDocumentCxs,
  updateDocumentDig,
  updateDocumentRep,
};
