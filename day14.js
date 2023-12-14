const fs = require("fs");
const data = fs.readFileSync("day14_input.txt", "utf-8");


let test = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

let grid = data.split("\n").map((line) => { return line.split("");});

let tilted_grid = Array(grid.length).fill(null).map(()=>Array(grid[0].length).fill('.'));

for (let x = 0; x < grid[0].length; x++) {
  let rounded = 0;
  let blank_spaces = 0;

  let column = []; 
  for (let y = 0; y < grid.length; y++) {
    if (grid[y][x] == "O") rounded++;
      else if (grid[y][x] == ".") blank_spaces++;
    else if (grid[y][x] == "#") {
      for (let i = 0; i < rounded; i++) {
        column.push("O"); 
      }
      for (let i = 0; i < blank_spaces; i++) {
        column.push(".");
      }
      column.push("#");
        blank_spaces = 0;
      rounded = 0; 
    }
  }

  for (let i = 0; i < rounded; i++) {
    column.push("O");
  }
  for (let i = 0; i < blank_spaces; i++) {
    column.push(".");
  }

  for (let y = 0; y < grid[0].length; y++) {
    tilted_grid[y][x] = column[y]; 
  }
}

let total_load = 0;
let total_rows = tilted_grid.length; 

tilted_grid.forEach((row, idx) => {
  row.forEach((cell) => {
    if (cell == "O") total_load += (total_rows - idx); 
  })
})

console.log(total_load);