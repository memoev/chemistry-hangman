var marioHangman = {
    mysteryArray: ['babymario', 'birdo', 'boo', 'bowser', 'goomba', 'koopatroopa', 'luigi', 'mario', 'peach', 'shyguy', 'starman', 'toad', 'waluigi', 'wario', 'yoshi'],
    numberOfWins: 0,
    remainGuess: 12,
    userTextWins: document.getElementById("numberOfWins"),
    userTextMystery: document.getElementById("mysteryWord"),
    userTextLetters: document.getElementById("guessedLetters"),
    generateWord: function (array) {
        var guess = array[Math.floor(Math.random() * array.length)];
        this.userTextMystery.textContent = guess;
        return guess;
    },
    updateGuessedLetters: function (guess) {
        var node = document.createTextNode(guess + ' ')
        this.userTextLetters.appendChild(node);
    },
    updateRemainGuess: function () {
        this.remainGuess--;
        console.log(this.remainGuess);
    }
}

window.onload = function () {
    console.log(marioHangman.generateWord(marioHangman.mysteryArray));
}

document.onkeyup = function (event) {
    var guess = event.key;
    marioHangman.updateGuessedLetters(guess);
    marioHangman.updateRemainGuess();
}
