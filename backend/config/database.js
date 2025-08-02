const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'skillswap_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

const createConnection = async () => {
  try {
    pool = mysql.createPool(dbConfig);
    console.log('✅ Database connection pool created successfully');
    return pool;
  } catch (error) {
    console.error('❌ Error creating database connection:', error.message);
    throw error;
  }
};

const getConnection = () => {
  if (!pool) {
    throw new Error('Database pool not initialized. Call createConnection first.');
  }
  return pool;
};

module.exports = {
  createConnection,
  getConnection,
  dbConfig
};