import mysql from "mysql2/promise";

async function getConnection() {
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: null,
  //   port: 3306,
  //   database: "db_tiem_thuoc",
  // });


  const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_tiem_thuoc',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  return connection;
}

export default getConnection;
