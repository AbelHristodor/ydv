const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

const db = require('./src/db');
const logger = require('./src/utils/logger');

// Allows only requests from a list of domains
const whitelist = ['http://localhost:4000', 'http://localhost:3000']; // white list consumers
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

// Standard middlewares
app.use(morgan(process.env.LOGGER_FORMAT));
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  express.static(path.join(__dirname, '../frontend/build', 'index.html'))
);
app.use(express.json());

// API routes
app.use('/api/verse/', require('./src/api/verse'));

// Route not found middleware
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  // Create error and add some info to it
  const error = new Error('Route not found');
  error.statusCode = 404;

  // Sending error to the errorHandler middleware
  next(error);
});

// Error handlers after all other middlewares
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // Generic Error handler

  // If status code of error not found then set it to a generic 500 internal server error
  if (!error.statusCode) error.statusCode = 500;

  // Send error
  res.status(error.statusCode).send({
    error: {
      status: error.statusCode,
      message: error.message || 'Internal Server Error',
      stack: error.stack,
    },
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Starting Server
const port = process.env.EXPRESS_PORT || 5000;
const host = process.env.EXPRESS_HOST || 'localhost';

const start = async () => {
  app.listen(port, () => {
    logger.info(`Listening: http://${host}:${port}`);
  });
};

start();
ç;
