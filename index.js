function getComputerChoice(){
    var choices = ["rock", "paper", "scissors"];
    var rand = Math.floor(Math.random() * 3);
    return choices[rand];
}

function getUserChoice(){
    const getContainer = document.querySelectorAll("button.btn-sqr");
    var signs = {
        "✊🏾": "rock",
        "🖐🏾": "paper",
        "✌🏾": "scissors"
    };
    
    for (var i = 0; i < getContainer.length; i++){
        getContainer[i].addEventListener("click", function () {
            var userChoice = signs[this.innerText];
            var computerChoice = getComputerChoice();
            var result = playRound(userChoice, computerChoice);
            var currentScore = updateScreen(result, userChoice, computerChoice);
            var playerScore = currentScore[0];
            var computerScore = currentScore[1];
            checkWin(playerScore, computerScore);
            
        });
    }
    
}

function playRound(userChoice, computerChoice){
    var winningCombos = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper"
    };

    // Draw case
    if (userChoice === computerChoice) {
        return "Draw"
    } else if (winningCombos[userChoice] === computerChoice) {
        // Player win Case
        return "player"
    }else{
        // computer win
        return "computer"
    }
}

function updateScreen (result, userChoice, computerChoice){
    var signs = {
        "rock": "✊🏾",
        "paper": "🖐🏾",
        "scissors": "✌🏾"
    }
    var scoreToUpdate = "";
    var scoreInfo = document.querySelector("h2.score-info");
    var scoreMessage = document.querySelector("h3.score-message");
    document.querySelector("h1.player-choice").textContent = signs[userChoice];
    document.querySelector("h1.computer-choice").textContent = signs[computerChoice];
    if (result === "player"){
        // updates the score info/ message
        scoreInfo.textContent = "You won!"
        scoreMessage.textContent = userChoice + " beats " + computerChoice;

        // increase the player score by 1 
        var getPlayer = document.querySelector("h3.player-score");
        scoreToUpdate = getPlayer.innerText.split(":")[1];
        getPlayer.textContent = "Player: " + (Number(scoreToUpdate) + 1);

    }else if (result === "computer"){
        // updates the score info/ message
        scoreInfo.textContent = "You lost!"
        scoreMessage.textContent = userChoice + " is beaten by " + computerChoice;

        // increase the computer score by 1 
        var getComputer = document.querySelector("h3.computer-score")
        scoreToUpdate = getComputer.innerText.split(":")[1];
        getComputer.textContent = "Computer: " + (Number(scoreToUpdate) + 1);
    }else{
        // updates the score info/ message to inform user of tie
        scoreInfo.textContent = "It's a tie!"
        scoreMessage.textContent = userChoice + " ties with " + computerChoice;
    }
    var getPlayer = document.querySelector("h3.player-score").innerText.split(":")[1];
    var getComputer = document.querySelector("h3.computer-score").innerText.split(":")[1];
    return [getPlayer, getComputer]


}

function checkWin(playerScore, computerScore){
    console.log(computerScore);
    if (playerScore == 5 || computerScore == 5){
        if (playerScore == 5){
            document.querySelector("p#end-game-message").textContent = "You Won!"
        }else{
            document.querySelector("p#end-game-message").textContent = "You Lost..."
        }
        document.querySelector("#overlay").classList.add("active");
        document.querySelector("#end-game").classList.add("active")

        // listen for play again
        const getPlayAgain = document.querySelector("button.play-again");
        getPlayAgain.addEventListener("click", function(){
            // reset the score board message
            document.querySelector("h2.score-info").textContent = "Choose your weapon";
            document.querySelector("h3.score-message").textContent = "First to score 5 points wins the game";

            // reset the player scores
            document.querySelector("h3.player-score").textContent = "Player: 0"
            document.querySelector("h3.computer-score").textContent = "Computer: 0"

            // deactivate the end game screen
            document.querySelector("#overlay").classList.remove("active");
            document.querySelector("#end-game").classList.remove("active")

        });
    }    
}

getUserChoice();