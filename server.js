// Core Modules
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());

// MOUNT ROUTES
mountRoutes(app);

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

app.get('/memberForm', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates/memberForm.html'));
});

app.get('/events', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates/eventForm.html'));
});

app.get('/participantForm', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates/participantForm.html'));
});

app.get('/workshops', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates/workshopForm.html'));
});

app.get('/form-succession', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'form-succession.html'));
});

app.get('/adminPanel', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'adminPanel.html'));
});

app.get('/addAdmin', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'addAdmin.html'));
});

app.get('/adminLogin', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'adminLogin.html'));
});

app.get('/forgetPassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'forgetPassword.html'));
});

app.get('/verificationCode', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'verificationCode.html'));
});

app.get('/newPassword', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'newPassword.html'));
});

app.get('/changePassword', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'changePassword.html'));
});

app.get('/errorPage', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'templates', 'errorPage.html'));
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