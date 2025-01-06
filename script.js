//global variables here: word, word array(s), guesses, guessedLetters
let word = "";
let guessedLetters = [];
let numWrongGuessesLeft;
let currWord = "";
//event listeners for startGame and guessLetter
window.onload = startGame()
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("guessLetter").addEventListener("click", guessLetter);
document.getElementById("guessWord").addEventListener("click", guessWord);
// document.getElementById("guessLetter").addEventListener("keypress", checkKey(event));
//once at start of the game
function startGame() {
    document.getElementById("guessedLetters").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("guessResult").innerHTML = "";
    guessedLetters = [];
    currWord = ""
    word = words[Math.floor(Math.random() * words.length)];
    numWrongGuessesLeft = 8;
    document.getElementById("numGuesses").innerHTML = "Guesses Remaining: " + numWrongGuessesLeft;
    for (let i = 0; i < word.length; i++) {
        currWord += "_ "
    }
    document.getElementById("word").innerHTML = currWord;
    // document.getElementById("word").innerHTML = word;
    /*
    - Reset the board, empty guessedLetters 
    - Set a word from words array into word - this line will grab  a random element from your words array for you:
    word = words[Math.floor(Math.random() * words.length)];
    */

}

//at start and every time the user enters a guess

//every time the user enters a guess
function guessLetter() {
    let letter = document.getElementById("guess").value.toLowerCase();
    if (checkGuess(letter) == false) {
        guessedLetters.push(letter);
        document.getElementById("guessedLetters").innerHTML = guessedLetters;
        numWrongGuessesLeft -= 1;
        document.getElementById("numGuesses").innerHTML = "Guesses Remaining: " + numWrongGuessesLeft;
    } else if (checkGuess(letter) == true) {
        for (let g = 0; g < word.length; g++) {
            if (letter == word.charAt(g)) {
                currWord = currWord.substring(0, g * 2) + letter + currWord.substring(g * 2 + 1);
            }
            if (currWord.replaceAll(" ", "") == word) {
                document.getElementById("guessResult").innerHTML = "You Win!";
            }
        }
    }

    /*
    Manage the game: Add letters to guessedLetters, call printWord, deduct from guesses, check for a win or loss.
    */
    document.getElementById("word").innerHTML = currWord;
    document.getElementById("guess").value = "";
}

function checkGuess(guess) {
    if ("abcdefghijklmnopqrstuvwxyz".indexOf(guess) == -1) {
        document.getElementById("guessResult").innerHTML = "Guess a Letter";
        setTimeout(clearResult, 1000);
    } else if (guess.length == 1 && guess != "") {
        for (let l = 0; l < guessedLetters.length; l++) {
            if (guess == guessedLetters[l]) {
                document.getElementById("guessResult").innerHTML = "Already Guessed";
                setTimeout(clearResult, 1000);
                return false;
            }
        }
        for (let l = 0; l < word.length; l++) {
            if (guess == word.charAt(l)) {
                return true;
            }
        }
        return false;
    } else if (guess.length > 1) {
        document.getElementById("guessResult").innerHTML = "Only Guess One Letter At a Time";
        setTimeout(clearResult, 1000);
    }
}

function guessWord() {
    let guess = document.getElementById("guess").value;
    if (guess.toLowerCase() == word) {
        document.getElementById("word").innerHTML = word.split("").join(" ");
        document.getElementById("guessResult").innerHTML = "You Win!";
    } else {
        numWrongGuessesLeft -= 1;
        document.getElementById("numGuesses").innerHTML = "Guesses Remaining: " + numWrongGuessesLeft;
    }
}

function clearResult() {
    document.getElementById("guessResult").innerHTML = "";
}

// function checkKey(key) {
//     if (key.key === "Enter"){
//         guessLetter()
//     }
// }