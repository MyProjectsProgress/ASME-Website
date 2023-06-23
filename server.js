// Core Modules
const path = require('path');

// Third Party Modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Project Files
dotenv.config({ path: 'config.env' });
const dbConncetion = require('./config/database');

// Importing Routes
const formRoute = require('./routes/formRoute')

// Connect the database
dbConncetion();

const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`${process.env.NDOE_ENV}`);
}

// Mount Routes
app.use('/api/v1/form', formRoute);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`App is Runinng  on Port ${PORT}`);
});