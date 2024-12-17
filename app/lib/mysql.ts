import mysql from 'mysql2/promise';

// Create the MySQL pool connection
export const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Sahitya@2005',
  database: 'user_registration',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Query function to interact with the database
export const query = async (sql: string, values: any[] = []) => {
  const [results] = await pool.execute(sql, values);
  return results;
};
