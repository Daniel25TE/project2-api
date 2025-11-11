const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./db/database');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/index'));

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
