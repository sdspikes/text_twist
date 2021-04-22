$(document).ready(function () {

  $('.start-btn').click(e => {
    $('.welcome').hide();
    $('.game-area').show();
    startGame(getRandomItem(sixLetterWords));
  });

});

function getRandomNumberUpTo(n) {
  return Math.floor(Math.random() * n);
}

function getRandomItem(arr) {
  return arr[getRandomNumberUpTo(arr.length)]
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

function isSubstringAnagram(guess, letters) {
  if (guess.length > letters.length) return false;
  const guessLetters = guess.toUpperCase().split('').sort();
  const seedLetters = letters.sort().toString();
  var seedIdx = -1;
  for (var i = 0; i < guessLetters.length; i++) {
    seedIdx = seedLetters.indexOf(guessLetters[i], seedIdx + 1);
    if (seedIdx == -1) {
      return false;
    }
  }
  return true;
}

function isRealWord(guess) {
  if (guess.length < 3 || guess.length > 6) return false;
  if (guess.length === 6) {
    return sixLetterWords.includes(guess);
  }
  return threeToFiveLetterWords.includes(guess);
}

function startGame(seedWord) {
  // console.log(seedWord);
  const letters = seedWord.split('');

  randomLetters = shuffleArray(letters);
  showLetters(randomLetters);

  $('form').submit(e => {
    e.preventDefault();
    const guess = $('.guess').val().toUpperCase();
    if (isSubstringAnagram(guess, letters) && isRealWord(guess)) {
      var listItem = '<li>' + guess + '</li>';
      $('.correct-guesses').append(listItem);
      $('.wrong-message').hide();
    } else {
      $('.wrong-message').show();
    }
    $('.guess').val('');
  })

}

