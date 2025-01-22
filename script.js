let word = "";
let guessedLetters = [];
let numWrongGuessesLeft;
let currWord = "";

window.onload = startGame()
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("guessLetter").addEventListener("click", guessLetter);
document.getElementById("guessWord").addEventListener("click", guessWord);
document.getElementById("guess").addEventListener("keyup", checkKey);

function startGame() {
    document.getElementById("guess").value = "",
    document.getElementById("guessedLetters").innerHTML = "";
    document.getElementById("word").innerHTML = "";
    document.getElementById("guessResult").innerHTML = "";
    guessedLetters = [];
    currWord = ""
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    document.getElementById("guess").setAttribute("maxlength", word.length);
    if (endless.value == "OFF") {
        numWrongGuessesLeft = 8;
        document.getElementById("numGuesses").innerHTML = "Guesses Remaining: " + numWrongGuessesLeft;
    }
    for (let i = 0; i < word.length; i++) {
        currWord += "_ "
    }
    document.getElementById("word").innerHTML = currWord;
}

function guessLetter() {
    let letter = document.getElementById("guess").value.toLowerCase();
    if (!checkGuess(letter)) {
        guessedLetters.push(letter);
        document.getElementById("guessedLetters").innerHTML = guessedLetters;
        numWrongGuessesLeft -= 1;
        document.getElementById("numGuesses").innerHTML = "Guesses Remaining: " + numWrongGuessesLeft;
        if (numWrongGuessesLeft == 0) {
            gameOver(false);
        }
    } else if (checkGuess(letter)) {
        for (let g = 0; g < word.length; g++) {
            if (letter == word.charAt(g)) {
                currWord = currWord.substring(0, g * 2) + letter + currWord.substring(g * 2 + 1);
            }
            if (currWord.replaceAll(" ", "") == word && endless.value == "OFF") {
                gameOver(true);
            } else if (currWord.replaceAll(" ", "") == word) {
                addWord();
                startGame();
            }
        }
    }

    document.getElementById("word").innerHTML = currWord;
    document.getElementById("guess").value = "";
}

function checkGuess(guess) {
    if (guess.length > 1) {
        // checks if guess is only one letter
        document.getElementById("guessResult").innerHTML = "Only Guess One Letter At a Time";
        setTimeout(clearResult, 1000);
    } else if ("abcdefghijklmnopqrstuvwxyz".indexOf(guess) == -1) {
        // checks if guess is letter
        document.getElementById("guessResult").innerHTML = "Guess a Letter";
        setTimeout(clearResult, 1000);
    } else if (guessedLetters.includes(guess)) {
        // checks if letter has already been guessed
        document.getElementById("guessResult").innerHTML = "Already Guessed";
        setTimeout(clearResult, 1000);
    } else if (guess.length == 1 && guess != "" && word.includes(guess)) {
        return true;
    } else if (guess != "") {
        return false;

    }
    return "do nothing"
}

function guessWord() {
    let guess = document.getElementById("guess").value;
    if (guess.toLowerCase() == word) {
        document.getElementById("word").innerHTML = word.split("").join(" ");
        if (endless.value == "OFF") {
            gameOver(true);
        } else {
            addWord();
            startGame();
        }
    } else {
        numWrongGuessesLeft -= 1;
        document.getElementById("numGuesses").innerHTML = "Guesses Remaining: " + numWrongGuessesLeft;
        if (numWrongGuessesLeft == 0) {
            gameOver(false);
        }
    }
}

function clearResult() {
    document.getElementById("guessResult").innerHTML = "";
}

function gameOver(win) {
    document.getElementById("guess").setAttribute("maxlength", 0);
    if (win) {
        document.getElementById("guessResult").innerHTML = "You Win!";
    } else {
        document.getElementById("guessResult").innerHTML = "You Lose :(";
    }
}

function checkKey(e) {
    let guessLen = document.getElementById("guess").value.length;
    if (e.code == "Enter" && guessLen < word.length) {
        guessLetter();
    } else if (e.code == "Enter" && guessLen == word.length) {
        guessWord();
    }
}