class Box {
    constructor(number, multiplier) {
      this.number = number;
      this.multiplier = multiplier;
      this.isOpen = false;
    }
  }
  
class Game {
    constructor() {
      this.grid = [];
      this.selectedMultipliers = [];
      this.betAmount = 0;
      this.spinCount = 0;
    }
  
    initialize() {
      if (this.grid.length === 0) {
        const multipliers = [15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 18, 19, 19, 19, 20, 20, 20];
        for (let i = 0; i < 9; i++) {
          const multiplier = multipliers[i];
          this.grid.push(new Box(i + 1, multiplier));
        }
      }
    }
  
    spinBox() {
      const closedBoxes = this.grid.filter((box) => !box.isOpen);
      const randomIndex = Math.floor(Math.random() * closedBoxes.length);
      const spunBox = closedBoxes[randomIndex];
      return spunBox ? spunBox.number : null;
    }
  
    openBox(boxNumber) {
      const boxIndex = boxNumber - 1;
      const box = this.grid[boxIndex];
      if (box && !box.isOpen) {
        box.isOpen = true;
        this.selectedMultipliers.push(box.multiplier);
        return box.multiplier; 
      }
      return null;
    }
  
    checkWinCondition() {
      const matchedMultipliers = new Set(
        this.selectedMultipliers.filter((multiplier, index, array) => array.indexOf(multiplier) !== index)
      );
      return matchedMultipliers.size >= 2;
    }
  
    displayGrid() {
      const gridContainer = document.getElementById("grid-container");
      gridContainer.innerHTML = ""; 
      console.log("--------------");
      for (let i = 0; i < this.grid.length; i++) {
        const box = this.grid[i];
        const boxContent = box.isOpen ? `x${box.multiplier}` : "";
        console.log(`|  ${boxContent}  |`);
  
        const boxElement = document.createElement("div");
        boxElement.classList.add("box");
        boxElement.innerText = boxContent;
        gridContainer.appendChild(boxElement);
  
        if ((i + 1) % 3 === 0) {
          console.log("--------------");
        }
      }
    }
  
    start() {
      const betInput = document.getElementById("bet-amount");
      const betAmount = parseInt(betInput.value);
      if (!isNaN(betAmount) && betAmount > 0) {
        this.betAmount = betAmount;
        this.initialize();
        this.displayGrid();
        console.log("Game Started!");
  
        const spunBox = this.spinBox();
        if (spunBox !== null) {
          const multiplier = this.openBox(spunBox);
  
          console.log(`Spun Box Number: ${spunBox}`);
          console.log(`Multiplier Revealed: ${multiplier}`);
  
          this.displayGrid();
  
          if (this.checkWinCondition()) {
            this.completeGame();
          }
        }
      } else {
        alert("Invalid bet amount. Please enter a valid number greater than 0.");
      }
    }
  
    completeGame() {
      const resultElement = document.getElementById("win-amount");
      const matchedMultipliers = new Set(
        this.selectedMultipliers.filter((multiplier, index, array) => array.indexOf(multiplier) !== index)
      );
  
      if (matchedMultipliers.size >= 2) {
        const winMultiplier = Array.from(matchedMultipliers)[0];
        const winAmount = this.betAmount * winMultiplier;
        resultElement.textContent = `You have won: ${winAmount}`;
        alert(`Congratulations! You have won: ${winAmount}`);
      } else {
        resultElement.textContent = "No win this time.";
        alert("Sorry, you didn't win this time.");
      }
  
      console.log("Game Completed!");
  
      this.grid = [];
      this.selectedMultipliers = [];
      this.betAmount = 0;
    }
  }
  
  const game = new Game();
  
  function startGame() {
    const betInput = document.getElementById("bet-amount");
    const betAmount = parseInt(betInput.value);
    if (!isNaN(betAmount) && betAmount > 0) {
      game.betAmount = betAmount;
      game.initialize();
      game.displayGrid();
      const resultElement = document.getElementById("result");
      resultElement.style.display = "block";
      resultElement.innerHTML = `
        <p id="spun-box">Spun Box Number:</p>
        <p id="multiplier">Multiplier Revealed:</p>
        <p id="win-amount"></p>
      `;
  
      console.log("Game Started!");
  
      const spunBox = game.spinBox();
      if (spunBox !== null) {
        const multiplier = game.openBox(spunBox);
  
        const spunBoxElement = document.getElementById("spun-box");
        spunBoxElement.innerText = `Spun Box Number: ${spunBox}`;
  
        const multiplierElement = document.getElementById("multiplier");
        multiplierElement.innerText = `Multiplier Revealed: ${multiplier}`;
  
        game.displayGrid();
  
        if (game.checkWinCondition()) {
          game.completeGame();
        }
      }
    } else {
      alert("Invalid bet amount. Please enter a valid number greater than 0.");
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const spinButton = document.getElementById("spin-btn");
    spinButton.addEventListener("click", startGame);
  });
  