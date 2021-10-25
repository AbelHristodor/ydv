const mongoose = require("mongoose");
const random = require("mongoose-simple-random");

const verseSchema = new mongoose.Schema({
  ref: {
    type: String,
  },
  bookId: {
    type: Number,
  },
});
verseSchema.plugin(random);

const Verse = mongoose.model("Verse", verseSchema);

module.exports = Verse;
