const mongoose = require('mongoose');

const dbConnect = hostname => {
    mongoose.connect(hostname, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    mongoose.Promise = global.Promise;
    mongoose.connection.on('error', error => console.log(error));

    return mongoose;
};

module.exports = dbConnect;