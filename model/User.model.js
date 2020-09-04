const Sequelize = require('sequelize');
const bcrypt = require("bcryptjs");
const dbConnection = require('../Database/dbConnection');

const user = dbConnection.define('user',{
    fullName :{
        type : Sequelize.STRING,
        allowNull : false
    },
    email : { 
        type : Sequelize.STRING,
        allowNull : false
    },
    password :{
        type : Sequelize.STRING,
        allowNull : false
    },
},{ timestamps : false});



user.sync()
    .then((res)=>{ console.log('Table User Created')})
    .catch((err)=>{ console.log('Table User NOt Created')})

    user.encryptPassword=(password)=>{
        return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null)
    }   
    
    user.validatePassword=(password,user)=>{
    return bcrypt.compareSync(password,user.password);
    }
    
   
module.exports = user;  