const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const db = mysql.createConnection(
  {
    host: '@localhost',
    user: 'root',
    password: '#DiaKid12',
    database: 'ecommerce_db',
  },
  console.log('Connected to the ecommerce_db database')
);

db.query('SELECT * FROM students', function (err, results) {
  console.log(results);
});

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
