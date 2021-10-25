const path = require('path');
const fs = require('fs');
const fastcsv = require('fast-csv');
const mongoose = require('mongoose');
const Verse = require('../models/verse');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const CSVpath = path.resolve(__dirname, 'verses.csv');

mongoose.connect(process.env.MONGODB_URI);

const parseCsv = () => {
  new Promise((resolve, reject) => {
    const promises = [];
    fs.createReadStream(CSVpath)
      .pipe(fastcsv.parse({ delimiter: ',', headers: false }))
      .on('data', row => promises.push(processData(row)))
      .on('error', reject)
      .on('end', async () => {
        await Promise.all(promises);
        resolve();
      });
  });
};

const processData = async row => {
  await Verse.create({
    bookId: parseInt(row[0]),
    ref: row[1],
  });
};

parseCsv();
