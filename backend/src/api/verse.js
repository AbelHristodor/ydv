const router = require('express').Router();
const axios = require('axios');
const ash = require('express-async-handler');
const { v1: uuidv1, parse } = require('uuid');

const Verse = require('../models/verse');
const ErrorHandler = require('../utils/error_handler');

const languages = {
  it: 'giovanni',
  en: 'kjv',
  ro: 'cornilescu',
  ru: 'synodal',
  es: 'rv1858',
  pt: 'almeida',
};

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
    if (!lang) throw new ErrorHandler(500, 'Language unavailable');

    Verse.findRandom({}, { __v: 0 }, { limit: 1 }, (err, result) => {
      if (err) throw new ErrorHandler(500, "Can't get random verse");
      const { ref, bookId, _id } = result[0];

      const [chapterNumber, verse] = ref.split(':');

      getChapter(lang, bookId, chapterNumber)
        .then(data => {
          const { name, verses, translation } = data.data;

          // Building Response
          const result = {
            name: `${name}:${verse}`,
            translation,
            verses: [],
          };

          // Multiple Verses
          if (verse.indexOf('-') != -1) {
            const [begin, end] = verse.split('-');
            for (let i = begin - 1; i < end; i++) {
              let toPush = {
                ...verses[i],
                id: uuidv1(),
              };
              result.verses.push(toPush);
            }
          } else {
            // Single Verse
            let toPush = {
              ...verses[parseInt(verse - 1)],
              id: uuidv1(),
            };
            result.verses.push(toPush);
          }

          res.status(200).send(result);
        })
        .catch(err => {
          throw new ErrorHandler(500, err.message);
        });
    });
  })
);

const getChapter = (lang, bookId, chapterNumber) => {
  const url = `https://getbible.net/v2/${lang}/${bookId}/${chapterNumber}.json`;
  try {
    return axios.get(url);
  } catch (err) {
    throw new ErrorHandler(500, err);
  }
};

module.exports = router;
