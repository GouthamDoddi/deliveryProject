const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// const secret = '!@#DWe$%^gge&&**';

const app = express();

app.use(cors());

// create application/json parser
// const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const routes = require('./src/routes/routes');

app.use('/', urlencodedParser, routes);
app.use(fileUpload());

// app.use('/api', jwt({ secret }).unless({ path: [ '/register', '/login' ] }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err;
    res.locals.error = req.app.get('env') === 'development'
        ? err
        : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => console.log('server running at 3000'));

module.exports = app;
