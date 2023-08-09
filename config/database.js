const { createPool } = require("mysql2");

const pool = createPool({
    port:3306,
    host:"localhost",
    user:"root",
    password:"Yash@123",
    database:"test",
    connectionLimit:10
});

// //To encrypt the connection details
// const pool1 = createPool({
//     port:process.env.DB_PORT,
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASS,
//     database:process.env.MYSQL_DB,
//     connectionLimit:10
// });

module.exports = pool;

// module.exports - pool1;

