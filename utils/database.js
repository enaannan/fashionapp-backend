const mysql = require('mysql2');



// create database connection
const conn = mysql.createConnection({
    host:'localhost',
    database:'fashionapp_store',
    user:'user2',
    password:'Ilovenii9%'});

//connect to database
// conn.connect((err)=>{
//     if(err)throw err;
//     console.log('Mysql connected');
// });

module.exports =  conn;