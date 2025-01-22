let endless = document.getElementById("endless");
let numWordsGuessed = 0;

endless.addEventListener("change", addWordCount);

let finishedWords = document.createElement("div");
let wordCount = document.createElement("p");
wordCount.innerHTML = "Word Count: ";
finishedWords.appendChild(wordCount);
let guessedWords = document.createElement("p");
finishedWords.appendChild(guessedWords);

function addWordCount() {
    if (endless.value == "ON") {
        document.getElementById("guessResult").after(finishedWords);
    } else {
        finishedWords.remove()
        wordCount.innerHTML = "Word Count: ";
        guessedWords.innerHTML = "";
    }
}

function addWord() {
    guessedWords.innerHTML += word + ", ";
    numWordsGuessed++;
    wordCount.innerHTML = "Word Count: " + numWordsGuessed;
    let currHighScore = Number(document.getElementById("highScore").innerHTML.substring(document.getElementById("highScore").innerHTML.length - 1));
    if (numWordsGuessed > currHighScore) {
        document.getElementById("highScore").innerHTML = "Endless High Score: " + numWordsGuessed;
       // saveHighScore("index.html");
    }
}