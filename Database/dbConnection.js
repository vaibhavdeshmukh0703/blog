const Sequelize = require('sequelize');
require('dotenv').config();
const connection = new Sequelize(process.env.CONNECTIONURL);

connection
    .authenticate()
        .then((res)=>{ console.log('Db connection created Succesfully')})
        .catch((err)=>{ console.log('Db Connection Not Created Sucessfully')});

module.exports = connection;        