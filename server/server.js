// server/server.js
require('dotenv').config();
require('./db/main');                   // initialize mongoose connection

const express        = require('express');
const cors           = require('cors');
const productsRoute  = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
