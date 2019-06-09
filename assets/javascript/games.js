//Word Guess Game

var player_chances=10, wins=0, losses=0, player_guesses=[];
var possible_words=["Cricket","Baseball","Rugby","Football","Basketball","Crew","Soccer","Curling"];
//var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var accept_input = false; //so the player doesn't spam us with letters
var computer_word="",letters,letters_guessed_right=0;

function start_game() {
    document.getElementById("player_chances").innerHTML = player_chances;
    player_guesses = [];
    accept_input=true;
    letters_guessed_right = 0;
    // Math.random() returns a floating-point, pseudo-random number in the range [0, 1) (inclusive of 0, but not 1)
    // Math.random() * (max - min) + min;  (mozilla.org)
    var idx = Math.floor(Math.random() * possible_words.length);
    computer_word = possible_words[idx].toLowerCase();
    letters = computer_word.split("");
    var letter_spans="";
    for (var i=0;i<letters.length;i++){
        letter_spans += "<span id='letter" + i +"'><span class='letter'></span></span>";
    };
    document.getElementById("word2Bguessed").innerHTML=letter_spans;
    console.log(computer_word); //remove for production
}

function compare_letters(player_choice){
    var message;
    // add input to array of guesses
    player_guesses.push(player_choice);
    //display all letters guessed on the html page
    document.getElementById("player_letters").innerHTML = player_guesses.join(",");
    //determine if player letter is part of the computer_word
    for (var i = 0; i < letters.length; i++) {
        if (letters[i]==player_choice) {
            document.getElementById("letter"+i).innerHTML=player_choice;
            letters_guessed_right++;
        }
    };
    if (letters_guessed_right===letters.length) {        
        wins++;
        document.getElementById("player_wins").innerHTML=wins;
        computer_word = "";
    } else if (player_guesses.length < player_chances) {
        accept_input=true;    
        document.getElementById("player_chances").innerHTML = player_chances - player_guesses.length;
    } else if (player_guesses.length >= player_chances){
        losses++;
        document.getElementById("player_losses").innerHTML = losses;
        computer_word = "";
    }
}

document.onkeyup = function (event) {
    if (computer_word==="") {
        //probably pressing key to start
        start_game();
    } else if (accept_input===true) {  
        accept_input=false; //so they don't spam us with letters
        // Captures the key press, converts it to lowercase, and saves it to a variable.
        compare_letters(event.key.toLowerCase());
    }
}
