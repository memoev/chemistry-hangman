var marioHangman = {
    mysteryArray: ['babymario', 'birdo', 'boo', 'bowser', 'goomba', 'koopatroopa', 'luigi', 'mario', 'peach', 'shyguy', 'starman', 'toad', 'waluigi', 'wario', 'yoshi'],
    correct: [],
    incorrect: [],
    userguess: [],
    numberOfWins: 0,
    remainGuess: 12,
    userTextWins: document.getElementById("numberOfWins"),
    userTextMystery: document.getElementById("mysteryWord"),
    userTextLetters: document.getElementById("guessedLetters"),
    userTextRemain: document.getElementById("remainGuess"),

    generateWord: function (array) {

        magicLetter = document.createElement('ul');
        var guess = array[Math.floor(Math.random() * array.length)];

        console.log(guess);

        for(i = 0; i < guess.length; i++) {
            this.correct.push(guess[i])
            var li = document.createElement("li");
            //li.setAttribute('id', i);
            li.innerHTML = '_';
            this.userguess.push('_');
            magicLetter.appendChild(li); 
            console.log(this.userguess); 
        }

        marioHangman.userTextMystery.appendChild(magicLetter);
    },

    updateGuessedLetters: function (guess) {
        var node = document.createTextNode(guess + ' ');

        this.incorrect.push(guess);
        this.userTextLetters.appendChild(node);
    },

    updateRemainGuess: function () {
        this.remainGuess--;
        this.userTextRemain.textContent = this.remainGuess;
        console.log(this.remainGuess);
    }
}

//GAME STARTS HERE

window.onload = function () {
    marioHangman.generateWord(marioHangman.mysteryArray);
}

document.onkeyup = function (event) {
    var guess = event.key;
    var match = false;

    for (i = 0; i < marioHangman.correct.length; i++) {

        if (guess === marioHangman.correct[i]) {
            match = true;
        }
        
    }
    console.log(match);
    
    if (match === true) {
        //do some logic here!
    } else {
        marioHangman.updateGuessedLetters(guess);
        marioHangman.updateRemainGuess();
    }
    
    //console.log(marioHangman.correct);
}
