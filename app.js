const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const PORT = process.env.PORT;

const userRouter = require('./src/routes/userRouter');
const entryRouter = require('./src/routes/entryRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(userRouter);
app.use(entryRouter);

//errores

app.use((error, req, res, next) => {
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//endpoint no encontrado
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
