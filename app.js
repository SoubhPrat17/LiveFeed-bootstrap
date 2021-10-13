const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const path = require('path');
const {requireAuth} = require('./authMiddlewares/middlewares')
const dotenv = require('dotenv').config()
const app = express();

const staticPath = path.join(__dirname,'/public');
app.use(express.static(staticPath));
// app.use(express.cookieParser())
console.log(process.env);
app.use(express.json());
app.set('view engine', 'ejs');

const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=> {
    app.listen(3000,()=>{
        console.log('Listening at port 3000')
    })
})
.catch((err => console.log(err)))




app.get('/' ,(req,res)=>{
    res.render('home')       // THIS ROUTE WILL RENDER ALWAYS BECAUSE THE HOME PAGE OF THE WEBPAGE
})


app.use(authRoutes)