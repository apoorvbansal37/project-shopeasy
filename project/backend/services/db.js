const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;
function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME || 'bolt',
      waitForConnections: true,
      connectionLimit: 10
    });
  }
  return pool;
}

async function initDb() {
  const p = getPool();
  return p.getConnection();
}

async function query(sql, params = []) {
  const [rows] = await getPool().query(sql, params);
  return rows;
}

module.exports = { initDb, query };
