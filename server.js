const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { connectToDatabase } = require('./db/database');

dotenv.config();
app.use(cors());
app.use(express.json());

app.use('/', require('./routes/index'));

connectToDatabase().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
