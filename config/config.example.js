require("dotenv").config();

module.exports = {
  development: {
    username: "DB_USERNAME",
    password: "DB_PASSWORD",
    database: "DB_NAME",
    host: "DB_HOST",
    dialect: "mysql || postgres || sqlite || mariadb || mongodb || mssql", // i use mysql as database
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
