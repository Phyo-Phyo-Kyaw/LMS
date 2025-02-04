import 'dotenv/config'; // Modern way to load .env variables
import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import { buildRouter } from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose'; 
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import session from 'express-session';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Make the 'path' module available to all EJS views
app.locals.path = path;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static('public'));

// In app.js or your main server file
app.use(session({
	secret: process.env.SESSION_SECRET || 'default-secret-key',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false } // Use 'secure: true' if you're using HTTPS
}));

// Use the auth routes
app.use('/', authRoutes);
app.use('/admin', adminRoutes);  // Admin routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
