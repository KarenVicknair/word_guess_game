//Word Guess Game

var player_chances=3, wins=0, losses=0, player_guesses=[];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var accept_input = false; //so the player doesn't spam us with letters
var computer_guess;

function start_game() {
    document.getElementById("player_chances").innerHTML = player_chances;
    player_guesses = [];
    accept_input=true;
    // Math.random() returns a floating-point, pseudo-random number in the range [0, 1) (inclusive of 0, but not 1)
    // Math.random() * (max - min) + min;  (mozilla.org)
    var idx = Math.floor(Math.random() * 25);
    computer_guess = alphabet[idx];
    console.log(idx,computer_guess); //remove for production
}

function compare_letters(player_choice){
    var message;
    // add input to array of guesses
    player_guesses.push(player_choice);
    //display all letters guessed on the html page
    document.getElementById("player_letters").innerHTML = player_guesses.join(",");

    if (player_choice===computer_guess) {        
        wins++;
        document.getElementById("player_wins").innerHTML=wins;
        message = "<p>Congratulations!!! You Won !!</p><p>Play again?</p>";
        start_game();
    } else if (player_guesses.length < player_chances) {
        accept_input=true;    
        message = "<p>Wrong guess.  You have " + (player_chances - player_guesses.length) +" chances left.</p>"
        document.getElementById("player_chances").innerHTML = player_chances - player_guesses.length;
    } else {
        losses++;
        document.getElementById("player_losses").innerHTML = losses;
        message ="<p>Out of chances.  You loose. Play again?</p>";
        start_game();
    }
    document.getElementById("message").innerHTML=message;
}

document.onkeyup = function (event) {
    if (accept_input===true) {  
        accept_input=false; //so they don't spam us with letters
        // Captures the key press, converts it to lowercase, and saves it to a variable.
        compare_letters(event.key.toLowerCase());
    }
}

//start the game
start_game();