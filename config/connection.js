const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'MONGODB://localhost:27017/socialmedia',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;
