
$(document).ready(function () {
  console.log("page is loaded!");

  $('.start-btn').click(e => {
    $('.welcome').hide()
    $('.game-area').show()
  });

  console.log(threeToFiveLetterWords);
  console.log(sixLetterWords);
});

