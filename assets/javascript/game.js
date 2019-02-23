var wordText = document.getElementById("word")
var wordGuessedText = document.getElementById("wordGuessed")
var livesText = document.getElementById("lives")
var winsText = document.getElementById("wins")
var lossesText = document.getElementById("losses")
var myaudio = document.getElementById("myaudio")
var champPic = document.getElementById("champPic")




var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

//word bank
var championArr = [
    {
        word: "LEBLANC",
        sound: "assets/Sound/3455_LeBlanc.joke2.wav",
        pic: "assets/images/leblanc.png"
    },
    {
        word: "AHRI",
        sound: "assets/Sound/0413_Ahri.dying1.wav",
        pic: "assets/images/ahri.webp"
    },
    {
        word: "LUX",
        sound: "assets/Sound/3726_Lux.laugh1.wav",
        pic: "assets/images/lux.png"
    },
    {
        word: "ORIANNA",
        sound: "assets/Sound/4548_Oriana.taunt.wav",
        pic: "assets/images/orianna.png"
    },
    {
        word: "LISSANDRA",
        sound: "assets/Sound/3606_Lissandra.ultimateeffort22.wav",
        pic: "assets/images/lissandra.png"
    },
    {
        word: "SYNDRA",
        sound: "assets/Sound/5793_Syndra.spelleventA2.wav",
        pic: "assets/images/syndra.png"
    },
    {
        word: "MORGANA",
        sound: "assets/Sound/13_morgana_skin05_recall_01.wav",
        pic: "assets/images/morgana.png"
    },
    {
        word: "RIVEN",
        sound:"assets/Sound/4887_Riven.taunt.wav",
        pic:"assets/images/riven.png",
    }
]

//generate a random number
var randomNumber = Math.floor(Math.random() * championArr.length);

//generate a random word from the word bank
var randomChampion = championArr[randomNumber].word

var characterRemain = randomChampion.length;

var answerArr = [];

var wordGuessed = [];

var gameStart = false;

var lives = 10;

var wins = 0;

var losses = 0;


//initiate game
function initiateGame() {
    replaceWord();
    wordText.textContent = answerArr.join(" ");
    wordGuessedText.textContent = "Word Guessed: " + wordGuessed;
    livesText.textContent = "Lives: " + lives
    winsText.textContent = "Wins: " + wins
    lossesText.textContent = "Losses: " + losses
    champPic.src = ""
    gameStart = true;
    //---------
    // wordGuessed = [];
    // wordGuessedText.textContent = "Word Guessed: " + wordGuessed;
    // randomChampion = championArr[Math.floor(Math.random() * championArr.length)].word
    // characterRemain = randomChampion.length

}

//replace word with "_"
function replaceWord() {
    answerArr = [];
    for (var i = 0; i < randomChampion.length; i++) {
        if (randomChampion[i] !== "$") {
            answerArr[i] = "_";
        }
    }
}

function putInAnswer(guess) {
    for (var i = 0; i < randomChampion.length; i++) {
        if (randomChampion[i] === guess) {
            answerArr[i] = guess;
        }
        wordGuessedText.textContent = "Word Guessed: " + wordGuessed
    }
}


//count how many more characters left from winning
function pullFromCharacterRemain(guess, remain) {
    for (var i = 0; i < randomChampion.length; i++) {
        if (guess === randomChampion[i]) {
            remain--;
        }
    }
    return remain;
}

//game reset
function resetGame() {
    gameStart = false;
    wordGuessed = [];
    lives = 10;
    wordGuessedText.textContent = "Word Guessed: " + wordGuessed;
    randomNumber = [Math.floor(Math.random() * championArr.length)]
    randomChampion = championArr[randomNumber].word
    characterRemain = randomChampion.length

}


document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase()
    console.log(userGuess)
    console.log(randomChampion)

    if (!gameStart && userGuess === " ") {
        initiateGame()
    };
    if (lives > 0) {
        if (characterRemain > 0) {
            if (gameStart && alphabet.indexOf(userGuess) !== -1 && wordGuessed.indexOf(userGuess) === -1) {
                wordGuessed.push(userGuess)
                wordGuessedText.textContent = "Word Guessed: " + wordGuessed
                if (randomChampion.indexOf(userGuess) !== -1) {
                    putInAnswer(userGuess);
                    characterRemain = pullFromCharacterRemain(userGuess, characterRemain);
                    wordText.textContent = answerArr.join(" ")
                    console.log("characters left " + characterRemain)
                    
                    if (characterRemain === 0) {
                        wins++
                        myaudio.src = championArr[randomNumber].sound
                        myaudio.play()
                        champPic.src = championArr[randomNumber].pic
                        resetGame()
                    }
                }
                else {
                    lives -= 1
                    console.log(lives)
                    livesText.textContent = "Lives: " + lives
                }
            }
        }

    }
    else {
        losses++
        alert("Sorry, you loss!")
        resetGame()

    }

}
