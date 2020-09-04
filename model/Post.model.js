const Sequelize = require('sequelize');
const dbConnection = require('../Database/dbConnection');
const User = require('./User.model');
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

User.hasMany(post,{foreignKey: 'userId',targetKey:'id'});
post.belongsTo(User,{foreignKey:'userId',targetKey:'id'});

post.sync()
    .then((res)=>{ console.log('Table post Created')})
    .catch((err)=>{ console.log('Table post NOt Created')})

module.exports = post; 