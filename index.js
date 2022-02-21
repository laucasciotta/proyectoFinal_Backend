
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');



const usuariosRoute = require('./routes/usuariosRoute')
const bebidasRoute=require('./routes/bebidasRoute')
const morgan = require('morgan')
const authRoutes =require('./routes/authRoutes')


const app = express();


mongoose.connect(process.env.MONGO_URL);
mongoose.connect('mongodb+srv://laucasciotta:febrero9@cluster0.r5u8n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');


app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use('/api/usuarios', usuariosRoute);
app.use('/api/bebidas',bebidasRoute);
app.use('/api/auth', authRoutes);


 

app.listen(process.env.PORT || 4000, () => {
  console.log('Servidor Funcionando');
})
