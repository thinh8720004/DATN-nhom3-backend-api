import mysql from "mysql2/promise";

async function getConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    port: 3306,
    database: "neww",
  });
  return connection;
}

export default getConnection;
