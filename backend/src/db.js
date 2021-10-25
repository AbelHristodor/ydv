const path = require('path');
const mongoose = require('mongoose');

const logger = require('./utils/logger');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connected to DB'))
  .catch(err => logger.error('Cannot connect to DB'));

module.exports = mongoose;
