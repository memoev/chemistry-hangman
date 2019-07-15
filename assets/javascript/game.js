var marioHangman = {
    mysteryArray: ['babymario', 'birdo', 'boo', 'bowser', 'goomba', 'koopatroopa', 'luigi', 'mario', 'peach', 'shyguy', 'starman', 'toad', 'waluigi', 'wario', 'yoshi'],
    numberOfWins: 0,
    remainGuess: 12,
    userTextWins: document.getElementById("numberOfWins"),
    userTextMystery: document.getElementById("mysteryWord"),
    generateWord: function (array) {
        var guess = array[Math.floor(Math.random() * array.length)];
        this.userTextMystery.textContent = guess;
        return guess;
    }
}

console.log(marioHangman.generateWord(marioHangman.mysteryArray));