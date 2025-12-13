require('dotenv').config();
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_INFO
mongoose.connect(mongoURL);
module.exports = mongoose;