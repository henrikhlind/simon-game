const colors = ['red', 'blue', 'green', 'yellow'];
const pattern = [];
const clickedPattern = [];
let level = 0;
let started = false;

function playSound(name) {
  new Audio('./sounds/' + name + '.mp3').play();
}

function animatePress(name) {
  $('#' + name).addClass('pressed');
  setTimeout(function () {
    $('#' + name).removeClass('pressed');
  }, 100);
}

function nextSequence() {
  level++;
  started = true;
  clickedPattern.length = 0;

  $('#level-title').text('Level ' + level);
  let r = Math.floor(Math.random() * 4);
  let rcolor = colors[r];
  pattern.push(rcolor);
  animatePress(rcolor);
  playSound(rcolor);
}

function checkAnswer(level) {
  console.log();
  if (clickedPattern[level - 1] == pattern[level - 1]) {
    if (level === pattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    $('h1').text('Game Over, Press Any Key to Restart');
    restart();
  }
}

function restart() {
  level = 0;
  pattern.length = 0;
  started = false;
}

$('.btn').click(function () {
  let clicked = $(this).attr('id');
  clickedPattern.push(clicked);
  checkAnswer(clickedPattern.length);
  animatePress(clicked);
  playSound(clicked);
});

$(document).keypress(function () {
  $('#level-title').text('Level ' + level);
  nextSequence();
  started = true;
});
