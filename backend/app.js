const express = require('express');
const app = express();
const cors = require('cors');
require('./connection/conn');
const todoRoutes = require('./routes/todoRoute');

const port = 3000;

app.use(cors());
// Middleware
app.use(express.json());

app.use('/api/', todoRoutes);

app.listen(3000, () => {
  console.log('Server Is Started');
});
