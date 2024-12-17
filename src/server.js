require('dotenv').config();
const app = require('./app');
const mongoose = require('./config/database'); 

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});
