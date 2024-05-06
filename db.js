const {createPool} = require('mysql2');

var pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "Task_Management",
    connectionLimit: 10
  });



  module.exports = pool;