const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

let port = process.env.PORT || 3000;

// ta linijka upewiamy się że poszczególne częsci kodu działają
app.use(cors());
app.use(bodyParser.json())

//Import Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');

app.use('/products', productsRoute);
app.use('/users', usersRoute);

//Middlewares miejsce gdzie mozemy wstawić logikę gdy uzyskamy połacznie z wybraną przez nas częścia routingu, może to być np jakaś funkcja
// np robi sie tu autoryzację użytkownika

// app.use('/posts',() => {
//     console.log('This is a middlewear running');
// });

//ROUTES res = require, res = responde
// get czyli wysłanie informacji na serwer

app.get('/', (req, res)=>{
    res.send('We are on home');
});

//gdybyśmy chcieli przejsc podczas nawigacji do stronki /posts to piszemy to tak

app.get('/products', (req, res)=>{
    res.send('We are on products');
});


app.get('/users', (req, res)=>{
    res.send('We are on users');
});

// Połącznie z bazą DB

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => console.log('connected to DB!'));

//Port z jakiego api będzie nasłuchiwać
app.listen(port, () => {
  console.log(`App is running on port http://localhost:${port}`);
});
