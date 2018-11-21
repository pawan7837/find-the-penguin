//show and explain class the initialization code. Give them index.html, and index.css file

$(document).ready(function () {
    /*This code will run after your page loads*/
    //Globals
    var elScoreboard = document.getElementById('scoreCount');
    var gameoverMsg = document.getElementById('gameoverMsg');
    var newGameIdsArr;
    var newMoundsArr;

    var gameIdsArr = ['penguin1', 'penguin2', 'penguin3', 'penguin4', 'penguin5', 'penguin6', 'penguin7', 'penguin8', 'yeti'];

    var moundsArr = ['images/mound_1.png', 'images/mound_2.png', 'images/mound_3.png', 'images/mound_4.png', 'images/mound_5.png', 'images/mound_6.png', 'images/mound_7.png', 'images/mound_8.png', 'images/mound_9.png'];


    //Capturing all the game pieces in an array
    var gamePieces = document.getElementsByClassName('gamePiece');

    //Randomize gameboard    
    shuffleBoard();

    //Add events
    addPieceEvents();


    //Adding eventlistener to game pieces
    function addPieceEvents() {
        for (var i = 0; i < gamePieces.length; i++) {
            var curPiece = gamePieces[i];
            curPiece.addEventListener('click', togglePiece, false);

        }
    }



    //show class first part of togglePiece function

    //Function to make the game pieces stay
    function togglePiece(e) {

        if (this.id.indexOf('yeti') != -1) {

            //Set background image for the yeti
            this.setAttribute('style', 'background-image:url(\'images/yeti.png\');');

            //Audio trigger for yeti
            var yetiGrowl = new Audio('media/yeti.wav');
            yetiGrowl.play();

            //Open Game Over window
            gameoverMsg.textContent = 'Game Over!';
            gameoverMsg.setAttribute('style', 'color: red;');
            gameoverModal.style.display = 'block';

            //show class up to here - they need to implement the penguin logic
        } else {


            //penguin code here to show penguin, play penguin sound
            var pieceID = this.id;
            var bgImgPath = 'images/penguin_' + pieceID.slice(7, 8) + '.png';
            this.setAttribute('style', 'background-image:url(' + bgImgPath + ');');
            var pensound = new Audio('media/penguin.wav');
            pensound.play();
            //increase the score
            if (elScoreboard.value == '') {
                elScoreboard.value = 1;
            } else {
                var curScore = parseInt(elScoreboard.value) + 1;
                elScoreboard.value = curScore;
            }
            if (parseInt(elScoreboard.value) == 8) {
                //set game message
                gameoverMsg.textContent = 'You Win!!!';
                gameoverMsg.setAttribute('style', 'color: green;');
                //open game over window
                gameoverModal.style.display = 'block';
            }
        }

    }







    //show class this part, so they understand how to interact with the gameover window
    //and close x button


    /**Code to display/hide the Game Over modal window and reset gameboard**/
    //Capture modal div
    var gameoverModal = document.getElementById('gameoverModal');
    //Capture modal close button
    var span = document.getElementsByClassName('close')[0];

    //Close modal if 'X' clicked
    span.onclick = function () {
        resetGame();
    }
    //Close modal if window clicked
    window.onclick = function (e) {
        if (e.target == gameoverModal) {
            resetGame();
        }
    }







    //class needs to implement resetGame ( don't show)


    //Function to reset the gameboard
    function resetGame() {

        //class needs to implement reseting the game
        //also keep track of high score
        //update the highscore
        updateHighscore();
        //reset game score
        elScoreboard.value = '';
        //reset gamepiece background images
        for (var i = 0; i < gamePieces.length; i++) {
            var curPiece = gamePieces[i];
            curPiece.removeAttribute('style');
        }
        //remove game over model window
        gameoverModal.style.display = 'none';
        shuffleBoard();
        addPieceEvents();

    }

    //function to update the highscore
    function updateHighscore() {
        var elHighscore = document.getElementById('highscoreCount');
        curScore = parseInt(elScoreboard.value);
        curHighscore = elHighscore.value;

        console.log('curScore: ' + curScore + ' - ' + curHighscore);

        if (curHighscore == '' && !isNaN(curScore)) {
            elHighscore.value = curScore;
        } else {
            curHighscore = parseInt(curHighscore);
            if (curHighscore < curScore) {
                elHighscore.value = curScore;
            }
        }
    }





    //give class shuffleBoard function. This sets the gameIdsArray, moundsArr
    //to the game piece id's using setAttribute. It is altering the DOM.


    //Function to shuffle the gameboard pieces
    function shuffleBoard() {
        newGameIdsArr = shuffle(gameIdsArr);
        newMoundsArr = shuffle(moundsArr);

        for (var i = 0; i < gameIdsArr.length; i++) {
            gamePieces[i].setAttribute('id', newGameIdsArr[i]);
            gamePieces[i].setAttribute('style', 'background-image: url(' + newMoundsArr[i] + ');');
        }
    }


    //give class the array shuffle code and explain

    //array shuffle code
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

});
