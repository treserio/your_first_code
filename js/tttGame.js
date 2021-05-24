document.addEventListener("DOMContentLoaded", function() {
    tttBoxes = document.getElementsByClassName("tttBox");

    for (i = 0; i < tttBoxes.length; i++) {
        tttBoxes[i].addEventListener("click", function(event) {
            playTTT(event);
        });
    }
});

// gameOn variables to control new TTT game and moves available
var gameOn = 0;
var tttMoves = [];

function playTTT(clicked) {
    // check for valid choice
    if (clicked.target.innerHTML == "-") {
        // make the player's move
        clicked.target.innerHTML = "X";

        // initialize moves array if gameOn = 0
        tttSetup();
        window.gameOn = 1;

        // let ai move randomly
        var exitCond = 0;

        // check win conditions for player
        setTimeout(exitCond = checkWin("X"), 300);

        while (exitCond == 0) {
            let mayI = window.tttMoves.splice(randomInt(window.tttMoves.length-1),1);

            if (document.getElementById(mayI).innerHTML == "-") {
                document.getElementById(mayI).innerHTML = "O";
                exitCond = 1;
            } else {
                continue
            }
        }

        // check win conditions for ai, and to keep from catsgaming on the last move check win condition
        setTimeout(exitCond = checkWin("O"), 10);


    } else {
        alert("Please make a valid move.");
    }
}

// random integer function
function randomInt(max){
    thing = Math.round(Math.random()*max);
    return thing;
}
// setup initial tttMoves array if new game
function tttSetup() {
    if (window.gameOn === 0) {
        window.tttMoves = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    }
}
// checking all win conditions
function checkWin(player) {

    // check horizontal
    if (document.getElementById("1").innerHTML == player && document.getElementById("2").innerHTML == player && document.getElementById("3").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } else if (document.getElementById("4").innerHTML == player && document.getElementById("5").innerHTML == player && document.getElementById("6").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } else if (document.getElementById("7").innerHTML == player && document.getElementById("8").innerHTML == player && document.getElementById("9").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } 
    // check vertical
    if (document.getElementById("1").innerHTML == player && document.getElementById("4").innerHTML == player && document.getElementById("7").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } else if (document.getElementById("2").innerHTML == player && document.getElementById("5").innerHTML == player && document.getElementById("8").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } else if (document.getElementById("3").innerHTML == player && document.getElementById("6").innerHTML == player && document.getElementById("9").innerHTML == player) {
        stopPlaying(player);
        return 1;
    }
    // check cross
    if (document.getElementById("1").innerHTML == player && document.getElementById("5").innerHTML == player && document.getElementById("9").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } else if (document.getElementById("3").innerHTML == player && document.getElementById("5").innerHTML == player && document.getElementById("7").innerHTML == player) {
        stopPlaying(player);
        return 1;
    } 
    // check catsgame, player is always last to play, this keeps it from executing twice when checking ai who always is O
    if (player == "X") {
        if (document.getElementById("1").innerHTML != "-" && document.getElementById("2").innerHTML != "-" && document.getElementById("3").innerHTML != "-" && document.getElementById("4").innerHTML != "-" && document.getElementById("5").innerHTML != "-" && document.getElementById("6").innerHTML != "-" && document.getElementById("7").innerHTML != "-" && document.getElementById("8").innerHTML != "-" && document.getElementById("9").innerHTML != "-") {
            stopPlaying("Nobody");
            return 1;
        } else {
            return 0;
        }
    }
}

function stopPlaying (player) {
    setTimeout( function() {
        if (confirm(player+"  won!\nPlay Again?") == true) {
            window.gameOn = 0;
            for (var i=1; i<10; i++) {
                document.getElementById(i.toString()).innerHTML = "-"
            }
        } else {
            alert("Thanks for Playing!");
        }
    }, 200 );
}
