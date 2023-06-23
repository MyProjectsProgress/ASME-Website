const mongoose = require('mongoose');  // for database connection and schemas

const dbConncetion = () => {
    mongoose.connect(process.env.DB_URI)
        .then((conn) => {
            console.log(`Database Connected: ${conn.connection.host}`);
        })
};

module.exports = dbConncetion;