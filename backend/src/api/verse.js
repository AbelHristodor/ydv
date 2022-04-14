const router = require('express').Router();
const axios = require('axios');
const ash = require('express-async-handler');

const books = require('../utils/books');
const languages = require('../utils/translations')

const Verse = require('../models/verse');
const { APIError, DatabaseError, BadRequestError} = require('../utils/errors');


router.get(
  '/ref/all',
  ash(async (req, res, next) => {
    await Verse.find(
      {},
      {
        _id: 0,
        __v: 0,
      }
    )
      .then(data => {
        res.status(200).send(data);
      })
      .catch(next);
  })
);

router.get(
  '/one/:lang',
  ash(async (req, res, next) => {
    const lang = languages[req.params.lang];
    if (!lang) throw new BadRequestError('Language unavailable');
    Verse.findRandom({}, {__v: 0}, {limit: 1}, (err, data) => {
      if(err){
        throw new DatabaseError()
      }
      const { ref, bookId, _id } = data[0];
      const book = books[bookId-1]
      getPassage(lang, ref, book).then((json) => {
        const data = JSON.parse(json.data.substring(1, json.data.length-2))
        const verses = data.book[0].chapter
        return res.send({
          id: _id,
          ref,
          book,
          translation: lang,
          lang: req.params.lang,
          verses,
        });
      })
    })
  })
);

const getPassage = (lang, ref, book) => {
  const url = `https://getbible.net/json?passage=${book} ${ref}&version=${lang}`
  try {
    return axios.get(url)
  } catch (err) {
    throw new APIError(502, 'Service Unavailable');
  }
}

module.exports = router;
