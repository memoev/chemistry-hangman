//MAIN OBJECT
var marioHangman = {
    //ARRAY TO HOLD GUESS WORDS
    mysteryArray: ['hydrogen', 'barium', 'gold', 'arsenic', 'neon'],
    //OBJECT VARIABLES USED DURING GAME
    correct: [],
    incorrect: [],
    userguess: [],
    numberOfWins: 0,
    remainGuess: 12,
    //DOCUMENT ELEMENTS
    userTextWins: document.getElementById("numberOfWins"),
    userTextMystery: document.getElementById("mysteryWord"),
    userTextLetters: document.getElementById("guessedLetters"),
    userTextRemain: document.getElementById("remainGuess"),
    userTextAnswer: document.getElementById("answer"),

    //FUNCTION TO GENERATE RANDOM WORD AND STORE IT
    generateWord: function (array) {

        var guess = array[Math.floor(Math.random() * array.length)];
        var magicLetter = document.createElement('ul');
        this.userguess.length = 0;

        console.log(guess);

        for(i = 0; i < guess.length; i++) {
            this.correct.push(guess[i])
            var li = document.createElement("li");
            li.setAttribute('id', i);
            li.innerHTML = '_';
            this.userguess.push('_');
            magicLetter.appendChild(li); 
        }
        
        console.log(this.userguess); 
        this.userTextMystery.appendChild(magicLetter);
        this.userTextRemain.textContent = this.remainGuess;
    },

    //FUNCTION TO UPDATE GUESS WORD
    updateWord: function (array) {

        marioHangman.userTextMystery.innerHTML = marioHangman.userguess.join('');

    },

    //FUNCTION TO UPDATE INCORRECT LETTERS
    updateGuessedLetters: function (guess) {

        var node = document.createTextNode(guess + ' ');

        this.incorrect.push(guess);
        this.userTextLetters.appendChild(node);
        
    },

    //FUNCTION TO UPDATE REMAINING GUESSES
    updateRemainGuess: function () {

        this.remainGuess--;
        this.userTextRemain.textContent = this.remainGuess;
        console.log(this.remainGuess);

    }
}

//AUDIO ELEMENTS
var audioElementTheme = document.createElement("audio");
audioElementTheme.setAttribute("src", "https://raw.githubusercontent.com/mexcelus/Word-Guess-Game/master/assets/tunes/maintheme.mp3");
var audioElementPause = document.createElement("audio");
audioElementPause.setAttribute("src", "https://raw.githubusercontent.com/mexcelus/Word-Guess-Game/master/assets/tunes/pause.mp3");
var audioElementWin = document.createElement("audio");
audioElementWin.setAttribute("src", "https://raw.githubusercontent.com/mexcelus/Word-Guess-Game/master/assets/tunes/powerup.mp3");
var audioElementLoose = document.createElement("audio");
audioElementLoose.setAttribute("src", "https://raw.githubusercontent.com/mexcelus/Word-Guess-Game/master/assets/tunes/dead.mp3");

//GAME STARTS HERE
function playgame () {

    marioHangman.generateWord(marioHangman.mysteryArray);
    
    //LOGIC BEHING MUSIC CONTROL
    //audioElement.play(); //Does not work with Chrome
    var playMusic = document.getElementById("buttonPlay")
    
    playMusic.onclick = function () {
        audioElementTheme.play();
    }

    var pauseMusic = document.getElementById("buttonPause")
    
    pauseMusic.onclick = function () {
        audioElementTheme.pause();
        audioElementPause.play();
    }

    //EVENT CATCHER
    document.onkeyup = function (event) {
        var guess = event.key;
        var match = false;
        var finish = false;

        //UPDATES ARRAY HOLDING GUESS WORD
        for (i = 0; i < marioHangman.correct.length; i++) {
            if (guess === marioHangman.correct[i]) {
                match = true;
                marioHangman.userguess[i] = guess;
            }  
        }
        //CONSOLE UPDATED GUESS WORD FOR TRACKING PURPOSES
        console.log(marioHangman.userguess);
        
        if (match === true) {
            marioHangman.updateWord(marioHangman.userguess);
        } else if (!marioHangman.incorrect.includes(guess)) {
            marioHangman.updateGuessedLetters(guess);
            marioHangman.updateRemainGuess();
        }

        //CHECK IF THERE'S STILL LETTERS TO BE GUESSED, IF NOT +1 POINT, PLAYS WINNING TONE AND REVEALS SECRET WORD IMAGE
        if (!marioHangman.userguess.includes('_')) {
            finish = true;
            marioHangman.numberOfWins++;
            marioHangman.userTextWins.textContent = marioHangman.numberOfWins;
            marioHangman.userTextAnswer.setAttribute("src", "../Word-Guess-Game/assets/images/" + marioHangman.userguess.join('') + ".gif");
            audioElementWin.play();
            console.log(finish);
        }

        //IF THERE'S NO MORE BLANK GUESS LETTERS RESETS OBJECT VARIABLES AND PLAYS ONE MORE TIME
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

        //IF REMAINING GUESSES RUN OUT LOOSE GAME, RESET VARIABLES AND PLAYS LOOSING TONE
        if (marioHangman.remainGuess === 0) {
            marioHangman.userTextMystery.innerHTML = '';
            marioHangman.userTextLetters.innerHTML = '';
            marioHangman.correct = [];
            marioHangman.incorrect = [];
            console.log(marioHangman.userguess);
            marioHangman.remainGuess = 12;
            marioHangman.userTextAnswer.setAttribute("src", "../Word-Guess-Game/assets/images/dead.gif");
            audioElementLoose.play();
            playgame();
        }       
    }
}

playgame();