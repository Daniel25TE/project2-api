const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./db/database');
const errorHandler = require('./middleware/errorHandler');
const passport = require('passport');
const session = require('express-session');

const app = express();

dotenv.config();
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3005',
  credentials: true
}));


app.use(express.json());
app.set('trust proxy', 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  })
);

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.get('/', (req, res) => {
  res.send('Welcome to Project 2 API!');
});


app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
