if (process.env.NODE_ENV !== "production"){
	require('dotenv').config()
}
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3007;
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Author = require('./models/author')
const User = require('./models/user');
const Book = require('./models/book');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const authorRoutes = require('./routes/authorRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

//connecting mongoose with mongodb
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/bookself-old1';
mongoose.connect(dbUrl, {
	useNewUrlParser:true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify:false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=> {
	console.log("database connected")
})

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/public'));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
const sessionConfig = {
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    //console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use('/authors' , authorRoutes);
app.use('/', userRoutes);
app.use('/books',bookRoutes);

app.get('/', (req,res) => {
	return res.render('home.ejs');
});

//***************************************** error handling ******************************************************

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', { err })
});

app.listen(port, ()=> {
	console.log('port is ready at' + port);
});