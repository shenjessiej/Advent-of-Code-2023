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

let expanded_grid = [];
let expanded_width = grid[0].length + empty_cols.length;

grid.forEach((row, row_idx) => {
  if (empty_rows.includes(row_idx)) {
    expanded_grid.push(Array(expanded_width).fill("."));
  }

  let new_row = [];
  row.forEach((col, col_idx) => {
    new_row.push(col);
    if (empty_cols.includes(col_idx)) {
      new_row.push(".");
    }
  });
  expanded_grid.push(new_row);
});

let galaxy_coords = new Map();

let galaxy_nums = 1;
expanded_grid.forEach((row, row_idx) => {
  row.forEach((col, col_idx) => {
    if (col == "#") {
      expanded_grid[row_idx][col_idx] = galaxy_nums;
      galaxy_coords.set(galaxy_nums, [row_idx, col_idx]);
      galaxy_nums++;
    }
  });
});

//console.log(galaxy_coords);

let total_sum = 0;
for (let i = 1; i <= galaxy_coords.size; i++) {
  for (let j = i + 1; j <= galaxy_coords.size; j++) {
    //console.log(galaxy_coords.get(i));
    total_sum +=
      Math.abs(galaxy_coords.get(i)[0] - galaxy_coords.get(j)[0]) +
      Math.abs(galaxy_coords.get(i)[1] - galaxy_coords.get(j)[1]);
  }
}

console.log(total_sum);

require("fs").writeFile(
  "day11_test.txt",
  expanded_grid
    .map(function (v) {
      return v.join("");
    })
    .join("\n"),
  function (err) {
    console.log(err ? "Error :" + err : "ok");
  },
);
