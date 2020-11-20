const express = require('express');
const connectDB = require('./config/db.js');
const path = require('path');
const dotenv = require('dotenv');
// Route
const user = require('./routes/api/users');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// Load env vars from config
dotenv.config({ path: './config/config.env' });
// Initial Express
const app = express();
// Connect DataBase
connectDB();

// Init Middleware
// Parse JSON
app.use(express.json());

// Mount routes for API
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
