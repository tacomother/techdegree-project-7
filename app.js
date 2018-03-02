const kb = document.getElementById('qwerty');
const phr = document.getElementById('phrase');
let missed = 0;

const btnReset = document.querySelector('.btn__reset');

// Hide the start screen overlay
btnReset.addEventListener('click', () => {
  const ovr = document.getElementById('overlay');
  ovr.style.display = 'none';
  resetPhrase();
});

const phrases = [
  'Wind is blowing',
  'I like you',
  'Be the one',
  'Pass me the ball',
  'Desire is sometimes helpful'
];

function getRandomPhraseArray(arr) {
  const index = Math.floor(phrases.length * Math.random());
  return arr[index].split('');
}

function addPhraseToDisplay(arr) {
  // Loops through an array of characters and store them in a list item.
  for (let i = 0; i < arr.length; i += 1) {
    const ul = phr.getElementsByTagName('ul')[0];
    const li = document.createElement('li');
    li.textContent = arr[i];
    if (arr[i] === ' ') {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li);
  }
}

function checkLetter(button) {
  const letters = phr.querySelectorAll('.letter');
  let matching = null;

  for(let i = 0; i < letters.length; i++) {
    const letter = letters[i].innerText.toUpperCase();

    if(button === letters[i].innerHTML) {
      letters[i].style.transition = 'all 0.5s ease-in-out';
    }

    if(button.toUpperCase() === letter) {
      letters[i].classList.add('show');
      matching = letters[i].innerText;
    }
  }
  return matching;
}
//if letter not found remove a heart img .tries class
kb.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const et = e.target;
    et.classList.add('chosen');
    et.disabled = true;
    const letterFound = checkLetter(et.textContent);
    if (letterFound === null) {
      const tries = scoreboard.querySelectorAll('.tries')[0];
      tries.parentNode.removeChild(tries);
      missed++;
    }
    checkWin();
  }
});

function checkWin() {
  const show = document.querySelectorAll('.show');
  const letter = document.querySelectorAll('.letter');
  const ovr = document.getElementById('overlay');
  const title = ovr.querySelector('.title');
  if (show.length === letter.length) {
    title.innerText = 'YOU WON AN EASY SIMPLE GAME!';
    ovr.setAttribute('class', 'win');
    ovr.style.display = '';
  } else if (missed >= 5) {
    title.innerText = 'HOW CAN YOU LOSE? TRY AGAIN!';
    ovr.setAttribute('class', 'lose');
    ovr.style.display = '';
  }
}

function resetPhrase() {
  const letters = qwerty.querySelectorAll('.chosen');
  for (let i = 0; i < letters.length; i += 1) {
    letters[i].setAttribute('class', '');
    letters[i].removeAttribute('disabled');
  }

  const ul = phr.getElementsByTagName('ul')[0];
  ul.innerHTML = '';

  const phraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(phraseArray);

  const tries = scoreboard.querySelectorAll('.tries');

  if (tries.length < 5) {
    for (let i = 0; i < missed; i++) {
      const ul = scoreboard.getElementsByTagName('ol')[0];
      const li = document.createElement('li');
      const img = document.createElement('img');
      li.className = 'tries';
      img.src = 'images/liveHeart.png';
      img.width = '35';
      img.height = '35';
      li.appendChild(img);
      ul.appendChild(li);
    }
  }
  missed = 0;
}
