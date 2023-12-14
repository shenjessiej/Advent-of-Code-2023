const fs = require("fs");
const data = fs.readFileSync("day13_input.txt", "utf-8");

let test = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

let patterns = test.split("\n\n");

let total = 0;
patterns.forEach((pattern) => {
  let grid = pattern.split("\n").map((line) => {
    return line.split("");
  });

  let origVerticalLines = verticalLines(grid);
  let origHorizontalLines = horizontalLines(grid);

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      let clone = structuredClone(grid);
      if (clone[x][y] == "#") clone[x][y] = ".";
      else if (clone[x][y] == ".") clone[x][y] = "#";

      verticalLines(clone).forEach((index) => {
        if (!origVerticalLines.includes(index)) {
          total += Number(index) + 1;
        }
      });

      horizontalLines(clone).forEach((index) => {
        if (!origHorizontalLines.includes(index)) {
          total += (Number(index) + 1) * 100;
        }
      });
    }
  }
});
console.log(total / 2);

function horizontalLines(grid) {
  let indices = [];

  for (let x = 0; x < grid.length - 1; x++) {
    let mirrored = true;
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] != grid[x + 1][y]) mirrored = false;
    }
    if (mirrored) {
      indices.push(x);
    }
  }

  let ans = [];
  indices.forEach((index) => {
    let ptr1 = index;
    let ptr2 = index + 1;
    let mirrored = true;
    while (ptr1 >= 0 && ptr2 < grid.length) {
      for (let y = 0; y < grid[0].length; y++) {
        if (grid[ptr1][y] != grid[ptr2][y]) mirrored = false;
      }
      ptr1--;
      ptr2++;
    }
    if (mirrored) ans.push(index);
  });

  return ans;
}

function verticalLines(grid) {
  let indices = [];

  for (let x = 0; x < grid[0].length - 1; x++) {
    let mirrored = true;
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] != grid[y][x + 1]) mirrored = false;
    }
    if (mirrored) {
      indices.push(x);
    }
  }

  let ans = [];
  indices.forEach((index) => {
    let ptr1 = index;
    let ptr2 = index + 1;

    let mirrored = true;
    while (ptr1 >= 0 && ptr2 < grid[0].length) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[y][ptr1] != grid[y][ptr2]) mirrored = false;
      }
      ptr1--;
      ptr2++;
    }
    if (mirrored) ans.push(index);
  });

  return ans;
}
