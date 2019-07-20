var marioHangman = {
    mysteryArray: ['babymario', 'birdo', 'boo', 'bowser', 'goomba', 'koopatroopa', 'luigi', 'mario', 'peach', 'shyguy', 'starman', 'toad', 'waluigi', 'wario', 'yoshi', 'piranhaplant'],
    correct: [],
    incorrect: [],
    userguess: [],
    numberOfWins: 0,
    remainGuess: 12,
    userTextWins: document.getElementById("numberOfWins"),
    userTextMystery: document.getElementById("mysteryWord"),
    userTextLetters: document.getElementById("guessedLetters"),
    userTextRemain: document.getElementById("remainGuess"),
    userTextAnswer: document.getElementById("answer"),

    generateWord: function (array) {

        var guess = array[Math.floor(Math.random() * array.length)];
        var magicLetter = document.createElement('ul');
        this.userguess.length = 0;

        console.log(guess);
        console.log(this.userguess);


        for(i = 0; i < guess.length; i++) {
            this.correct.push(guess[i])
            var li = document.createElement("li");
            li.setAttribute('id', i);
            li.innerHTML = '_';
            this.userguess.push('_');
            magicLetter.appendChild(li); 
        }
        
        console.log(this.userguess); 
        console.log(this.correct);
        this.userTextMystery.appendChild(magicLetter);
        this.userTextRemain.textContent = this.remainGuess;
    },

    updateWord: function (array) {

        marioHangman.userTextMystery.innerHTML = marioHangman.userguess.join('');

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

function playgame () {

    var audioElementTheme = document.createElement("audio");
    audioElementTheme.setAttribute("src", "../word-guess-game/assets/tunes/maintheme.mp3");
    var audioElementPause = document.createElement("audio");
    audioElementPause.setAttribute("src", "../word-guess-game/assets/tunes/pause.mp3");
    var audioElementWin = document.createElement("audio");
    audioElementWin.setAttribute("src", "../word-guess-game/assets/tunes/powerup.mp3");
    //audioElement.play(); //Does not work with Chrome
    marioHangman.generateWord(marioHangman.mysteryArray);

    var playMusic = document.getElementById("buttonPlay")
    
    playMusic.onclick = function () {
        audioElementTheme.play();
    }

    var pauseMusic = document.getElementById("buttonPause")
    
    pauseMusic.onclick = function () {
        audioElementTheme.pause();
        audioElementPause.play();
    }
  
    document.onkeyup = function (event) {
        var guess = event.key;
        var match = false;
        var finish = false;


        for (i = 0; i < marioHangman.correct.length; i++) {

            if (guess === marioHangman.correct[i]) {
                match = true;
                marioHangman.userguess[i] = guess;
            }
            
        }
        console.log(marioHangman.userguess);
        console.log(match);
        
        if (match === true) {
            marioHangman.updateWord(marioHangman.userguess);
        } else if (!marioHangman.incorrect.includes(guess)) {
            marioHangman.updateGuessedLetters(guess);
            marioHangman.updateRemainGuess();
        }
        
        //console.log(marioHangman.correct);


        if (!marioHangman.userguess.includes('_')) {
            finish = true;
            marioHangman.numberOfWins++;
            marioHangman.userTextWins.textContent = marioHangman.numberOfWins;
            marioHangman.userTextAnswer.setAttribute("src", "../Word-Guess-Game/assets/images/" + marioHangman.userguess.join('') + ".gif");
            audioElementWin.play();
            console.log(finish);
        }

        if (finish === true) {
            //Some clean up and make the play function recursive
            marioHangman.userTextMystery.innerHTML = '';
            marioHangman.userTextLetters.innerHTML = ''
            marioHangman.correct = [];
            marioHangman.incorrect = [];
            console.log(marioHangman.userguess);
            marioHangman.remainGuess = 12;
            playgame();
        } 
        
        if (marioHangman.remainGuess === 0) {
            marioHangman.userTextMystery.innerHTML = '';
            marioHangman.userTextLetters.innerHTML = '';
            marioHangman.correct = [];
            marioHangman.incorrect = [];
            console.log(marioHangman.userguess);
            marioHangman.remainGuess = 12;
            playgame();
        }
        
    }

}

playgame();
