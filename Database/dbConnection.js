const Sequelize = require('sequelize');
const Connection_URL = 'postgres://postgres:vaibhav@123@localhost:5432/blog';
const connection = new Sequelize(Connection_URL);

connection
    .authenticate()
        .then((res)=>{ console.log('Db connection created Succesfully')})
        .catch((err)=>{ console.log('Db Connection Not Created Sucessfully')});

module.exports = connection;        