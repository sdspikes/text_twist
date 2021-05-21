$(document).ready(function () {

  $('.start-btn').click(e => {
    setupGame();
  });

  $('.continue').click(e => {
    setupGame();
  })

});

// Generate all possible orderings of all substrings, saving the real words
function generateAllAnagrams(seedWord) {
  var result = [];
  // Use recursive backtracking to generate all options.
  // Start with an empty string and build it up
  function genAnagramRec(letters, index, newWord) {
    if (isRealWord(newWord)) result.push(newWord);
    if (index >= letters.length) return;

    var myLetter = letters[index]
    for (var i = index; i < letters.length; i++) {
      // For each letter that comes at or after my current position, try using
      // that letter next.  We swap it with the current letter and advance the
      // index so that once we use this letter, we won't try to use it again
      // (we only look at letters past this position in future calls)
      letters[index] = letters[i];
      letters[i] = myLetter;
      genAnagramRec(letters, index + 1, newWord + letters[index]);
      // Undo the swap to backtrack (leave the array as it was when we got it)
      letters[i] = letters[index];
      letters[index] = myLetter;
    }
  }
  genAnagramRec(seedWord.split(''), 0, "");
  console.log(result);
  return result;
}

function setupGame() {
  // Reset all elements to start a new round
  $('.welcome').hide()
  $('.game-area').show()
  $('.wrong-message').hide();
  $('.correct-guesses').empty()
  $('.guess').val('')
  $('.missed-words-container').hide()
  $('.missed-words').empty()
  $('.guess-area').show()

  startGame(getRandomItem(sixLetterWords));
}

function getRandomNumberUpTo(n) {
  return Math.floor(Math.random() * n);
}

function getRandomItem(arr) {
  return arr[getRandomNumberUpTo(arr.length)];
}

/* Randomize array in-place using Durstenfeld shuffle algorithm
   source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandomNumberUpTo(i + 1);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function showLetters(letters) {
  $('.letters').text(letters.join(''));
}

function isRealWord(guess) {
  if (guess.length < 3 || guess.length > 6) return false;
  if (guess.length === 6) {
    return sixLetterWords.includes(guess);
  }
  return threeToFiveLetterWords.includes(guess);
}

function startGame(seedWord) {
  const allValidAnagrams = generateAllAnagrams(seedWord);

  const letters = seedWord.split('');
  const randomLetters = shuffleArray(letters);
  showLetters(randomLetters);

  var playerGuesses = [];

  // We unbind here to make sure there's only ever one listener for this element
  $('form').unbind('submit');
  $('form').submit(e => {
    e.preventDefault();
    const guess = $('.guess').val().toUpperCase();
    if (allValidAnagrams.includes(guess)) {
      var listItem = '<li>' + guess + '</li>';
      $('.correct-guesses').append(listItem);
      $('.wrong-message').hide();
    } else {
      $('.wrong-message').show();
    }
    $('.guess').val('');
  });

  $('.done').unbind('click');
  $('.done').click(e => {
    $('.guess-area').hide()

    const missedWords = allValidAnagrams.filter(word => !playerGuesses.includes(word));
    if (missedWords.length > 0) {
      $('.missed-words-container').show();
      missedWords.forEach(word => $('.missed-words').append('<li>' + word + '</li>'));
    }
  });
}
