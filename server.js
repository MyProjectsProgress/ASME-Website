// Core Modules
const path = require('path');
const bodyParser = require('body-parser');

// Third Party Modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Project Files
dotenv.config({ path: 'config.env' });
const dbConncetion = require('./config/database');
const globalError = require('./middlewares/errorMiddleware');
const ApiError = require('./utils/apiError');

// REQUIRING ROUTES
const mountRoutes = require('./routes');

// Connect the database
dbConncetion();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'templates')));

// Middlewares
app.use(express.json());

// MOUNT ROUTES
mountRoutes(app);

app.get('/api/v1/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

app.get('/api/v1/adminPanel', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'adminPanel.html'));
});

app.get('/api/v1/addAdmin', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'addAdmin.html'));
});

app.get('/api/v1/auth/adminLogin', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'adminLogin.html'));
});

app.get('/api/v1/forgetPassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'forgetPassword.html'));
});

app.get('/api/v1/verificationCode', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'verificationCode.html'));
});

app.get('/api/v1/newPassword', (req, res) => {
    console.log(__dirname, 'templates', 'newPassword.html')
    res.sendFile(path.join(__dirname, 'templates', 'newPassword.html'));
});

app.get('/api/v1/form', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates/form.html'));
});

app.get('/api/v1/form-succession', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'form-succession.html'));
});


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`${process.env.NODE_ENV}`);
}

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
    // console.log(res);
    console.log(`App is Runinng  on Port http://localhost:${PORT}/api/v1/home`);
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