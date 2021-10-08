//express
const express = require('express')
const flash = require('express-flash')
const session = require('express-session')
const { body, param, validationResult } = require('express-validator')
const json = require('express').json
//env var
const { port, sessLifetime, sessName, sessSecret } = require('./config/session-config')
const IN_PROD = process.env.NODE_ENV === 'production'
//users controllers
const {
    getUserById,
    getUserByEmail,
    createUser
} = require('./controllers/users');  

//ext.modules
const methodOverride = require('method-override')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
windowMs: 1 * 60 * 1000,
max: 10
});
const logger = require('morgan');
//passport authentication
const passport = require('passport')
const initializePassport = require('./config/passport-config');
initializePassport(
    passport,
    getUserByEmail,
    getUserById
    )
//swagger api documentation  
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

//app
const app = express()
app.set('view-engine', 'ejs')

//use modules
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(limiter);
app.use(compression());
app.use(helmet());
app.use(json());
app.use(logger('dev'))
//routers
const envelopes = require('./routers/envelopes')
const transactions = require('./routers/transactions')

app.use('/envelopes', envelopes);
app.use('/transactions', transactions);
//API docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//login val-san chain and helper
function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return next();
}

const userBodyValidation = [
    body('name').notEmpty().isLength({min: 1, max: 35}).trim().escape(),
    body('email').isEmail().trim().escape(),
    body('password').isStrongPassword().escape()
];

//authentication & session
app.use(flash())
app.use(session({
    name: sessName,
    resave: false,
    saveUninitialized:false,
    secret: sessSecret,
    cookie: {
        maxAge: Number(sessLifetime),
        sameSite: true,
        secure: IN_PROD
    }
}))
app.use(passport.initialize())
app.use(passport.session())

//authentication helpers
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}

//authentication routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name});
});
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs', {message: req.flash('message')});
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
});
app.post('/register', checkNotAuthenticated, userBodyValidation, validate, createUser);
app.delete('/logout', checkAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/login');
});

//listener
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})

module.exports = app