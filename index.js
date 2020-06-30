
/*
RESTful Services by NodeJS
Author :enaannan
Update : 20/05/2020
 */

const express = require('express');
const bodyparse = require('body-parser');
const app =express();


const adminRoutes = require('./routes/admin');
const userRoutes=require('./routes/user');

app.listen(process.env.PORT);
// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);
// const port = process.env.PORT || 3000;



// parse application using json
app.use(bodyparse.json());
app.use('/',()=>{
    console.log("start here");
})

app.use('/admin',adminRoutes);

app.use('/user',userRoutes);

//server listening
// app.listen(port,()=>{
//     console.log('Server started on port 3000...');
// });
