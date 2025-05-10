const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./userModel');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/physioapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  // For demo: plain text password check (use bcrypt in production)
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ message: 'Login successful', user: { email: user.email, name: user.name } });
});

// Start server
app.get('/', (req, res) => res.send('Backend is running!'));
app.listen(3001, () => console.log('Server running on port 3001'));