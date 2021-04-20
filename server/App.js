const express = require('express');
const path = require('path');

require('dotenv').config();

const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');

// Database
const db = require('./config/database');

// Database connection
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

app.use('/auth', userRoutes);
app.use('/posts', postsRoutes);
app.use('/comments', commentsRoutes);

// parsing multipart/form-data
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started at port ${PORT}...`));
