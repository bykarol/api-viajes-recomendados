const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT;

const userRouter = require('./src/routes/entryRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(userRouter);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
