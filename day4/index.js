const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());

const dbConfig = require('./config/database.config.js');



mongoose.connect("mongodb+srv://admin:im41tb24@mycluster.a29mj.mongodb.net/orders?retryWrites=true&w=majority").then(() =>{
    console.log("success!");
}).catch(err =>{
    console.log("unsuccessful,",err);
})

app.get('/',(req,res)=>{
    res.json({"message": "Welcome to Shopping cart application"});
});

require('./app/routes/order.routes')(app);

app.listen(4000, () => {
    console.log("listening to 4000");
})
