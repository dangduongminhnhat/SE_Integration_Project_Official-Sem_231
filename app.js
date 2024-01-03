var express = require('express');
var url = require('url');
var fs = require('fs');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require("express-rate-limit");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');

const homepageRoute = require('./routes/homepage');
const documentManagementRoute = require('./routes/document_management');
const loanManagementRoute = require('./routes/loan_management');
const signinRoute = require('./routes/signin');
const authorizationRoute = require("./routes/authorization");
const registrationRoute = require("./routes/registration");
const reviewRoute = require("./routes/review");
const postRoute = require('./routes/post_management');
const userManagement = require('./routes/user_management');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const cspConfig = {
  directives: {
    scriptSrc: ["'self'", "ajax.googleapis.com", "cdn.jsdelivr.net", "www.google.com"],
    frameSrc: ["'self'", "www.google.com"],
  },
};



var app = express();
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy(cspConfig));
app.use(express.static('assets'));
app.use(limiter);
app.use(cors({ origin: "http://localhost:3000" }))
app.use(cookieParser());
app.use(session({
  secret: "Your secret key",
  resave: false,
  saveUninitialized: true,
}));

app.use("/api/homepage", homepageRoute);

app.use("/api/documentManagement", documentManagementRoute);

app.use("/api/loanManagement", loanManagementRoute);

app.use("/api/signin", signinRoute);

app.use("/api/authorization", authorizationRoute);

app.use("/api/register", registrationRoute);

app.use("/api/review", reviewRoute);

app.use("/api/post", postRoute);

app.use("/api/userManagement", userManagement);


app.listen(8080);
