const fs = require("fs");
const data = fs.readFileSync("day3_input.txt", "utf-8");

const test = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

let lines = data.split('\n');

let grid = lines.map((line) => {
  return line.split("");
})

function checkIfSymbol(character) {
  return (character.charCodeAt(0) > 32 && character.charCodeAt(0) < 46) || character.charCodeAt(0) == 47 || (character.charCodeAt(0) > 57 && character.charCodeAt(0) < 65);
}

let total = 0;
let currentNumString = "";
let isLegal = false;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] >= 0 && grid[i][j] <= 9) {
      // when we hit a number, add to the current number string
      currentNumString += grid[i][j];
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if ((i + x > 0 && i + x < grid.length - 1) && j + y > 0 && j + y < grid[0].length - 1) {
            isLegal = isLegal || checkIfSymbol(grid[i + x][j + y]);
          }
        }
      }
    } else {
      // we hit a non number symbol 
      // check if there is currently a number in the buffer
      // if so, check the legality / add to total and reset buffer
      if (currentNumString.length > 0) {
        if (isLegal) {
          total += Number(currentNumString);
        }
        isLegal = false;
        currentNumString = "";
      }
    }
  }
}

console.log(total);