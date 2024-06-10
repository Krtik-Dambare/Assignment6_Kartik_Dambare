const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/authors', require('./routes/authorRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/ratings', require('./routes/ratingRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));