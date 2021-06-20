const mongoose = require('mongoose');
const { DB_PORT } = require("./index")

mongoose.connect(`mongodb://localhost:${DB_PORT}/life-hacks-spa`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Conected DB")
});

module.exports = mongoose;