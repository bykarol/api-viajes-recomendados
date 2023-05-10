const express = require('express');
const morgan = require('morgan');

const userRouter = require('./src/routes/entryRouter');

const app = express();
app.use(morgan('dev'));
//app.use(express.json());
app.use(userRouter);

app.listen(3000, () => console.log('escuchando puerto 3000'));
