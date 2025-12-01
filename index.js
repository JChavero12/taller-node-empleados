// Dependencies
const express = require('express');
const morgan = require('morgan');
const app = express();

// Routes
const user = require('./routes/user');
const employees = require('./routes/employees');

// Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');
const index = require('./middleware/index');

app.use(cors); 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', user);

app.use(auth);

app.use('/employees', employees);

app.use('/', index);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});