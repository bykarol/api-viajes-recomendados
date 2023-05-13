const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');

require('dotenv').config();
const PORT = process.env.PORT;

const userRouter = require('./src/routes/userRouter');
const entryRouter = require('./src/routes/entryRouter');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

const staticDirectory = path.join(__dirname, process.env.UPLOADS_DIRECTORY_FROM_APP);

app.use(express.static(staticDirectory));

app.use(fileUpload());

//end-point
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
