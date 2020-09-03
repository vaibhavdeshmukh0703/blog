const Sequelize = require('sequelize');
const dbConnection = require('../Database/dbConnection');

const post = dbConnection.define('post',{
    title :{
        type : Sequelize.STRING,
        allowNull : false
    },
    description : { 
        type : Sequelize.STRING,
        allowNull : false
    },
    createdAt :{
        type : Sequelize.DATE,
        default: Date.now,
    },
},{ timestamps : false});

post.sync()
    .then((res)=>{ console.log('Table post Created')})
    .catch((err)=>{ console.log('Table post NOt Created')})

module.exports = post; 