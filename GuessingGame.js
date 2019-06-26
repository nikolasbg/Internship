const gameData = {
  difficult: "medium",
  isPlaying: false,
  timer: "",
  timeout:"",
  randomNumbers: [],
  randomNumber: 0,
  counter: "",
  score: {
    hit: 0,
    miss: 0,
    left: 26
  },
  letters: [
    { number: 1, letter: "a" },
    { number: 2, letter: "b" },
    { number: 3, letter: "c" },
    { number: 4, letter: "d" },
    { number: 5, letter: "e" },
    { number: 6, letter: "f" },
    { number: 7, letter: "g" },
    { number: 8, letter: "h" },
    { number: 9, letter: "i" },
    { number: 10, letter: "j" },
    { number: 11, letter: "k" },
    { number: 12, letter: "l" },
    { number: 13, letter: "m" },
    { number: 14, letter: "n" },
    { number: 15, letter: "o" },
    { number: 16, letter: "p" },
    { number: 17, letter: "q" },
    { number: 18, letter: "r" },
    { number: 19, letter: "s" },
    { number: 20, letter: "t" },
    { number: 21, letter: "u" },
    { number: 22, letter: "v" },
    { number: 23, letter: "w" },
    { number: 24, letter: "x" },
    { number: 25, letter: "y" },
    { number: 26, letter: "z" },
    { number: 1, letter: "A" },
    { number: 2, letter: "B" },
    { number: 3, letter: "C" },
    { number: 4, letter: "D" },
    { number: 5, letter: "E" },
    { number: 6, letter: "F" },
    { number: 7, letter: "G" },
    { number: 8, letter: "H" },
    { number: 9, letter: "I" },
    { number: 10, letter: "J" },
    { number: 11, letter: "K" },
    { number: 12, letter: "L" },
    { number: 13, letter: "M" },
    { number: 14, letter: "N" },
    { number: 15, letter: "O" },
    { number: 16, letter: "P" },
    { number: 17, letter: "Q" },
    { number: 18, letter: "R" },
    { number: 19, letter: "S" },
    { number: 20, letter: "T" },
    { number: 21, letter: "U" },
    { number: 22, letter: "V" },
    { number: 23, letter: "W" },
    { number: 24, letter: "X" },
    { number: 25, letter: "Y" },
    { number: 26, letter: "Z" }
  ]
};

// DOM ELEMENTS
const elements = {
  startButton: document.querySelector(".start--button"),
  defaultRadioButton: document.querySelector("#default--radio-button"),
  radioButtons: document.querySelectorAll(".radio--buttons-button"),
  numberToShow: document.querySelector(".number"),
  input: document.querySelector(".guess--number"),
  lettersContainer: document.querySelector(".letters--container"),
  scoreHit: document.querySelector(".score--hit"),
  scoreMiss: document.querySelector(".score--miss"),
  scoreLeft: document.querySelector(".score--left")
};

const renderLetters = () => {
  for (let i = 0; i < 26; i++) {
    const letter = (i + 10).toString(36).toUpperCase();
    const markup = `<div class="letters--container-letter">${letter} (${i +
      1})</div>`;
    elements.lettersContainer.insertAdjacentHTML("beforeend", markup);
  }
};

renderLetters();

// RESET DATA
const resetData = () => {
  gameData.difficult = "medium";
  gameData.isPlaying = false;
  gameData.score.hit = 0;
  gameData.score.miss = 0;
  gameData.score.left = 26;
  gameData.randomNumber = 0;
  gameData.randomNumbers = [];
};

const resetDom = () =>{
  const letters = document.querySelectorAll(".letters--container-letter");
  
  Array.prototype.slice.call(letters).map(letter => {
    letter.classList.remove("letters--container-letter-wrong");
    letter.classList.remove("letters--container-letter-correct");
  });
  elements.scoreLeft.textContent = `Left: ${gameData.randomNumbers.length}`;
  
  elements.scoreMiss.textContent = "Miss: 0";
  elements.scoreHit.textContent = "Hit: 0";
  elements.scoreLeft.textContent = "Left: 26";
  
  elements.input.value = "";
  elements.input.disabled = true;
  elements.numberToShow.textContent = 0;
}

// GET RADIO BUTTON VALUE
const getRadioButtonValue = () => {
  const btns = document.querySelectorAll(".radio--buttons-button");
  const radioButtons = Array.prototype.slice.call(btns);
  const value = radioButtons.filter(radioButton => {
    return radioButton.checked;
  });
  gameData.difficult = value[0].value;
  return value[0].value;
};

// INTERVAL TIMER BASED ON CHOOSED DIFFICULT
const timing = counter => {
  switch (counter) {
    case "easy":
      counter = 5000;
      break;
    case "medium":
      counter = 3500;
      break;
    case "hard":
      counter = 2000;
      break;
    default:
      counter = 6000;
  }
  gameData.counter = counter;
  return counter;
};

// GENERATE RANDOM NUMBERS ARRAY
const randomNumbersArray = () => {
  while (gameData.randomNumbers.length < 26) {
    var random = Math.floor(Math.random() * 26 + 1);
    if (gameData.randomNumbers.indexOf(random) === -1) {
      gameData.randomNumbers.push(random);
    }
  }
};

// GENERATE RANDOM NUMBER
const randomNumber = () => {
  const r = gameData.randomNumbers.splice(0, 1);
  return r[0];
};

const updateScore = () => {
  elements.scoreLeft.textContent = `Left: ${gameData.score.left}`;
};

// RENDER NUMBER
const renderNumber = randomNumber => {
  if (gameData.randomNumbers.length === 0) {
    clearInterval(gameData.timer);
  }
  gameData.randomNumber = randomNumber;
  elements.numberToShow.textContent = gameData.randomNumber;
  elements.input.disabled = false;
  elements.input.focus();
  elements.input.value = "";
  gameData.score.left--;
  gameData.timeout = setTimeout(() => {
    if(!gameData.isPlaying){
      clearTimeout(gameData.timeout)
    }else{
      if (elements.input.value === "") {
        const letters = document.querySelectorAll(".letters--container-letter");
        const selectedLetter = gameData.letters.find(letter => {
          return letter.number === randomNumber;
        });
        const wrongLetter = Array.prototype.slice.call(letters).find(letter => {
          return (
            letter.textContent.charAt(0) === selectedLetter.letter.toUpperCase()
          );
        });
        if (
          !wrongLetter.classList.contains("letters--container-letter-correct")
        ) {
          gameData.score.miss++;
          elements.scoreMiss.textContent = `Miss: ${gameData.score.miss}`;
          wrongLetter.classList.remove("letters--container-letter-correct");
          wrongLetter.classList.add("letters--container-letter-wrong");
        }
      }
    }
  }, gameData.counter);
  updateScore();
};

// GET INPUT VALUE
const getInputValue = () => {

  elements.input.disabled = true;
  const value = elements.input.value;
  const letters = document.querySelectorAll(".letters--container-letter");
  const singleLetter = gameData.letters.find(letter => {
    return letter.letter === value;
  });
  if (value.length > 0 && singleLetter) {
    if (singleLetter.number === gameData.randomNumber) {
      const correctLetter = Array.prototype.slice.call(letters).find(letter => {
        return (
          letter.textContent.charAt(0) === singleLetter.letter.toUpperCase()
        );
      });
      gameData.score.hit++;
      elements.scoreHit.textContent = `Hit: ${gameData.score.hit}`;
      correctLetter.classList.remove("letters--container-letter-wrong");
      correctLetter.classList.add("letters--container-letter-correct");
    } else {
      const selectedLetter = gameData.letters.find(letter => {
        return letter.number === gameData.randomNumber;
      });
      const wrongLetter = Array.prototype.slice.call(letters).find(letter => {
        return (
          letter.textContent.charAt(0) === selectedLetter.letter.toUpperCase()
        );
      });
      wrongLetter.classList.remove("letters--container-letter-correct");
      wrongLetter.classList.add("letters--container-letter-wrong");
    }
  }
};

// START GAME
elements.startButton.addEventListener("click", () => {
  let radioButtonValue, counter;
  gameData.isPlaying
  ? (gameData.isPlaying = false)
  : (gameData.isPlaying = true);
  gameData.isPlaying
  ? (elements.startButton.textContent = "Stop")
  : (elements.startButton.textContent = "Start Game");
  if (gameData.isPlaying) {
    resetDom();
    radioButtonValue = getRadioButtonValue();
    counter = timing(radioButtonValue);
    randomNumbersArray();
    resetButtons();
    setTimeout(() => {
      elements.input.disabled = false;
      elements.input.focus();
    }, gameData.counter)
    gameData.timer = setInterval(() =>renderNumber(randomNumber()), counter);
  } else {
    resetData();
    clearInterval(gameData.timer);
    resetButtons();
  }
});

const resetButtons = () =>{
  if(gameData.isPlaying){
    elements.radioButtons.forEach(el => el.setAttribute('disabled',''))
  }else{
    elements.radioButtons.forEach(el => el.removeAttribute('disabled'))
  }
}

elements.input.addEventListener("keyup", getInputValue);

