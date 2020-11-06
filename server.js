const express = require('express');
const connectDB = require('./config/db.js');
// Initial Express
const app = express();
// Connect DataBase
connectDB();

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
