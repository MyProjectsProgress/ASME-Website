const formRoute = require('./formRoute');
// const memberRoute = require('./memberRoute');
const adminRoute = require('./adminRoute');
const eventRoute = require('./eventRoute');
// const workshopRoute = require('./workshopRoute');
const authRoute = require('./authRoute');

const mountRoutes = (app) => {
    app.use('/api/v1/form', formRoute);
    // app.use('/api/v1/member', memberRoute);
    app.use('/api/v1/admin', adminRoute);
    app.use('/api/v1/event', eventRoute);
    // app.use('/api/v1/workshop', workshopRoute);
    app.use('/api/v1/auth', authRoute);
};

module.exports = mountRoutes;