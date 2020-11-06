const express = require('express');
const connectDB = require('./config/db.js');
// Route
const user = require('./routes/api/user');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// Initial Express
const app = express();
// Connect DataBase
connectDB();

// Middleware
// Parse JSON
app.use(express.json());

// Mount routes for API
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.get('/', (req, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
