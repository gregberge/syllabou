(function () {

  var getSyllables, pickRandomValue, createRandomWord, displayWord, generate, syllablesCache;


  // get syllables from data file first time, then from cache
  getSyllables = function (callback) {

    if (syllablesCache) {
      return callback(syllablesCache);
    }

    $.get('data/syllables.csv').then(function (data) {
      syllablesCache = data.split('\n');
      callback(syllablesCache);
    }, function () {
      alert('Fucking error!');
    });
  };

  // pick a random value from an array
  pickRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  // create a random word
  createRandomWord = function (syllables, length) {
    var i, word = '';

    for (i = length - 1; i >= 0; i--) {
      word += pickRandomValue(syllables);
    }

    return word;
  };

  // display word on page
  displayWord = function (word) {
    $('#word').html(word);
  };

  // generate and display word
  generate = function () {
    getSyllables(function (syllables) {
      displayWord(createRandomWord(syllables, 3));
    });
  };

  $('.generate-trigger').on('click', generate);

}());