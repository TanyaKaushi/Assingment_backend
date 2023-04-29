const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () =>
    console.log("Mongodb connection established sucessfully")
);

const productRouter = require('./routes/products');
app.use('/products', productRouter);
// const registerRouter = require('./routes/register');
// app.use('/register', registerRouter); 
// const loginRouter = require('./routes/login');
// app.use('/login', loginRouter); 

app.listen(port, () => console.log(`The app is running on port : ${port}`));
