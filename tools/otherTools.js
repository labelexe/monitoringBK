'use strict';

const { transliterate } = require('transliteration')
const levenshtein = require('fast-levenshtein');

const similarity = (word, str) => {
	return levenshtein.get(word, str);
}

const translate = (str) => {
	return transliterate(str)
}

module.exports = {
	translate,
	similarity
}
