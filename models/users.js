const { connect } = require("../startup/db");

async function selectUsers() {
  const conn = await connect();
  const [rows] = await conn.query("SELECT * FROM tb_usuario;");
  return rows;
}

async function selectUserbyUser(user) {
  const conn = await connect();
  const sql = "SELECT * FROM tb_usuario where usuario = ?;";
  const [rows] = await conn.query(sql, [user]);
  return rows;
}

async function insertUser(user) {
  const conn = await connect();
  const sql = "INSERT INTO tb_usuario(usuario,senha,perfil) VALUES (?,?,?);";
  const values = [user.usuario, user.senha, user.perfil];
  return await conn.query(sql, values);
}

async function updateUser(usuario, user) {
  const conn = await connect();
  const sql = "UPDATE tb_usuario SET perfil=? WHERE usuario=?";
  const values = [user.perfil, usuario];
  return await conn.query(sql, values);
}

async function deleteUser(user) {
  const conn = await connect();
  const sql = "DELETE FROM tb_usuario where usuario = ?;";
  return await conn.query(sql, [user]);
}

module.exports = {
  selectUsers,
  selectUserbyUser,
  insertUser,
  updateUser,
  deleteUser,
};
