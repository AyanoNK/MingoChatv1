const mysql = require('mysql');
//I need callback, so I translate from callback to promises with
//promisify that comes with Node.util
const { promisify }= require('util');

//I require from keys some parameters, I only want {database}
const { database } = require('./keys');

//use connection with pull, closer to production than: create connection
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

////Promisify pool query: that which i want to convert to promises.
//Everytime I make queries I can make promises
pool.query = promisify(pool.query);

module.exports = pool;