// Core Modules
const path = require('path');

// Third Party Modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Project Files
dotenv.config({ path: 'config.env' });
const dbConncetion = require('./config/database');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// Importing Routes
const formRoute = require('./routes/formRoute');
const adminRoute = require('./routes/adminRoute');

// Connect the database
dbConncetion();

const app = express();
app.use(express.static(path.join(__dirname, 'uploads')));

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`${process.env.NDOE_ENV}`);
}

// Mount Routes
app.use('/api/v1/form', formRoute);
app.use('/api/v1/admin', adminRoute);

// WORKS WHEN THE URL IS NOT IN THE PREDEFINED URIS
app.all("*", (req, res, next) => {
    // CREATE ERROR AND SEND IT TO GLOBAL ERROR HANDLING MIDDLEWARE
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// GLOBAL ERROR HANDLING MIDDLEWARE FOR EXPRESS
// EXPLAINATION: any error occurs in req - res process is caught here.
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`App is Runinng  on Port ${PORT}`);
});

// HANDLING REJECTION OUTSIDE EXPRESS
// EXPLAINATION: IT IS FOR ERRORS OUT OF EXPRESS, COULD BE WRONG URL DATABASE CONNECTION THAT IS IN config.env FILE
process.on("unhandledRejection", (err) => {
    console.error(`UnhandledRejection Erorrs: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});