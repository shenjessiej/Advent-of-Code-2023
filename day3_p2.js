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

function isNum(num) {
  return num >= 0 && num <= 9;
}

function findNum(grid, i, j) {
  let curr = "";
  if (isNum(grid[i][j])) {
    // if we hit a digit, go left and add to the current number string until we hit a non digit, then go right and add to current number string until we hit a non digit        
    let x = j;
    while (x >= 0 && isNum(grid[i][x])) {
      if (!visited[i][x]) {
        visited[i][x] = true;
        curr = grid[i][x] + curr;
      }
      x--;
    }
    x = j + 1;
    while (x <= grid[0].length - 1 && isNum(grid[i][x])) {
      if (!visited[i][x]) {
        visited[i][x] = true;
        curr = curr + grid[i][x];
      }
      x++;
    }

  }
  return curr;
}

let visited = new Array(grid.length).fill(false).map(_ => Array(grid[0].length).fill(false));

let total = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] == "*") {
      // we hit a gear symbol
      // find the two numbers adjacent to it

      let first = "";
      let second = "";

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if ((i + x >= 0 && i + x <= grid.length - 1) && j + y >= 0 && j + y <= grid[0].length - 1) {
            curr = findNum(grid, i + x, j + y);

            if (curr.length > 0) {
              if (first.length == 0) first = curr;
              else if (second.length == 0) second = curr;
            }

          }
        }
      }

      // after we check all directions, multiple first * second and add to total
      if (first.length > 0 && second.length > 0) {
        total += Number(first) * Number(second);
      }
    }
  }
}

console.log(total);