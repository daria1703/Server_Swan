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
app.set("view engine", "ejs")

//Import Routes
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const ordersRoute = require('./routes/orders');
const vouchersRoute = require('./routes/vouchers');
const wishListRoute = require('./routes/wish_lists');
const commentsRoute = require('./routes/comments');
const addressesRoute = require('./routes/addresses');
const categoriesRoute = require('./routes/categories');


app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/orders', ordersRoute);
app.use('/vouchers', vouchersRoute);
app.use('/wish_lists', wishListRoute);
app.use('/comments', commentsRoute);
app.use('/addresses', addressesRoute);
app.use('/categories', categoriesRoute);
app.use('/users/register', usersRoute)

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

app.get('/orders', (req, res)=>{
    res.send('We are on orders');
});

app.get('/vouchers', (req, res)=>{
    res.send('We are on vouchers');
});

app.get('/wish_lists', (req, res)=>{
    res.send('We are on wish lists');
});

app.get('/comments', (req, res)=>{
    res.send('We are on comments');
});

app.get('/addresses', (req, res)=>{
    res.send('We are on addresses');
});

app.get('/categories', (req, res)=>{
    res.send('We are on categories');
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
