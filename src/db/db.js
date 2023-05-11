const mysql = require('mysql2/promise');

require('dotenv').config();

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD } = process.env;

let pool;

const getDB = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      timezone: 'Z',
    });
  }
  return await pool.getConnection();
};

module.exports = getDB;
