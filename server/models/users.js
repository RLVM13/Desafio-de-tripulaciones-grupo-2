const pool = require('../config/db_pgsql'); // Conexión a BBDD 
const queries = require("../queries/usuarios.queries");

//POST USER
const signup = async (user) => {
  const { nombre, apellidos, perfil, email, password, role, status } = user;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.insertarUsuario, [
      nombre,
      apellidos,
      perfil,
      email,
      password,
      role
    ]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

//PARA BUSCAR SI EXISTE UN USUARIO ANTES DE BORRARLO
const login = async (email, password) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.loginUsuario, [email, password]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const getAllUsers = async () => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.mostrarUsuarios, []);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const revokeaccess = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(queries.deshabilitarUsuario, [email]);
    /* result = data.rowCount; */
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const userModels = {
  signup,
  login,
  revokeaccess,
  getAllUsers
};

module.exports = userModels;