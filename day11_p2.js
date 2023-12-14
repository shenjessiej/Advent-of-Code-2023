const fs = require("fs");
const data = fs.readFileSync("day11_input.txt", "utf-8");

let test = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

let grid = data.split("\n");
grid = grid.map((row) => {
  return row.split("");
});

let empty_rows = [];

grid.forEach((row, idx) => {
  let empty = true;
  row.forEach((col) => {
    if (col == "#") {
      empty = false;
    }
  });
  if (empty) empty_rows.push(idx);
});

let empty_cols = [];

for (let i = 0; i < grid[0].length; i++) {
  let empty = true;
  for (let j = 0; j < grid.length; j++) {
    if (grid[j][i] == "#") {
      empty = false;
    }
  }
  if (empty) empty_cols.push(i);
}


let galaxy_coords = new Map();

let galaxy_nums = 1;
grid.forEach((row, row_idx) => {
  row.forEach((col, col_idx) => {
    if (col == "#") {
      grid[row_idx][col_idx] = galaxy_nums;
      galaxy_coords.set(galaxy_nums, [row_idx, col_idx]);
      galaxy_nums++;
    }
  });
});

//console.log(galaxy_coords);

let total_sum = 0;
for (let i = 1; i <= galaxy_coords.size; i++) {
  for (let j = i + 1; j <= galaxy_coords.size; j++) {
    
    let empty_rows_btwn_count = 0;
    empty_rows.forEach((row_idx) => {
      if (row_idx >= Math.min(galaxy_coords.get(i)[0], galaxy_coords.get(j)[0]) && row_idx <= Math.max(galaxy_coords.get(i)[0], galaxy_coords.get(j)[0])) {
        empty_rows_btwn_count++;
      }
    });

    
    let empty_cols_btwn_count = 0;
    empty_cols.forEach((col_idx) => {
        if (col_idx >= Math.min(galaxy_coords.get(i)[1], galaxy_coords.get(j)[1]) && col_idx <= Math.max(galaxy_coords.get(i)[1], galaxy_coords.get(j)[1])) {
            empty_cols_btwn_count++;
        }
    });

    total_sum += Math.abs(galaxy_coords.get(i)[0] - galaxy_coords.get(j)[0]) + (empty_rows_btwn_count * 999999); 

    
    total_sum += Math.abs(galaxy_coords.get(i)[1] - galaxy_coords.get(j)[1]) + (empty_cols_btwn_count * 999999); 

  }
}

console.log(total_sum);
require("fs").writeFile(
  "day11_test.txt",
  grid
    .map(function (v) {
      return v.join("");
    })
    .join("\n"),
  function (err) {
    console.log(err ? "Error :" + err : "ok");
  },
);
