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

let grid = data.split("\n").map((line) => {
  return line.split("");
});

let map = new Map();

function nextCycle(grid) {
  return tiltEast(tiltSouth(tiltWest(tiltNorth(tilted_grid))));
}

function getAsString(grid) {
    return grid.map((row) => {
      return row.join(",");
    }).join(";");
}


function tiltNorth(grid) {
  let tilted_grid = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill("."));

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
  return tilted_grid;
}

function tiltSouth(grid) {
  let tilted_grid = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill("."));

  for (let x = 0; x < grid[0].length; x++) {
    let rounded = 0;
    let blank_spaces = 0;

    let column = [];
    for (let y = 0; y < grid.length; y++) {
      if (grid[y][x] == "O") rounded++;
      else if (grid[y][x] == ".") blank_spaces++;
      else if (grid[y][x] == "#") {
        for (let i = 0; i < blank_spaces; i++) {
          column.push(".");
        }
        for (let i = 0; i < rounded; i++) {
          column.push("O");
        }
        column.push("#");
        blank_spaces = 0;
        rounded = 0;
      }
    }

    for (let i = 0; i < blank_spaces; i++) {
      column.push(".");
    }

    for (let i = 0; i < rounded; i++) {
      column.push("O");
    }

    for (let y = 0; y < grid.length; y++) {
      tilted_grid[y][x] = column[y];
    }
  }
  return tilted_grid;
}

function tiltWest(grid) {
  let tilted_grid = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill("."));
  for (let y = 0; y < grid.length; y++) {
    let rounded = 0;
    let blank_spaces = 0;

    let column = [];
    for (let x = 0; x < grid[0].length; x++) {
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

    for (let x = 0; x < grid[0].length; x++) {
      tilted_grid[y][x] = column[x];
    }
  }
  return tilted_grid;
}

function tiltEast(grid) {
  let tilted_grid = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill("."));
  for (let y = 0; y < grid.length; y++) {
    let rounded = 0;
    let blank_spaces = 0;

    let column = [];
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] == "O") rounded++;
      else if (grid[y][x] == ".") blank_spaces++;
      else if (grid[y][x] == "#") {
        for (let i = 0; i < blank_spaces; i++) {
          column.push(".");
        }
        for (let i = 0; i < rounded; i++) {
          column.push("O");
        }
        column.push("#");
        blank_spaces = 0;
        rounded = 0;
      }
    }

    for (let i = 0; i < blank_spaces; i++) {
      column.push(".");
    }
    for (let i = 0; i < rounded; i++) {
      column.push("O");
    }
    
    for (let x = 0; x < grid[0].length; x++) {
      tilted_grid[y][x] = column[x];
    }
  }
  return tilted_grid;
}

function calculateLoad(grid) {
  let total_load = 0;
  let total_rows = grid.length;

  grid.forEach((row, idx) => {
    row.forEach((cell) => {
      if (cell == "O") total_load += total_rows - idx;
    });
  });

  return total_load;
}

let tilted_grid = grid;

for (let cycle = 0; cycle < 1000000000; cycle++) {
  let grid_key = getAsString(tilted_grid);

  if (map.has(grid_key)) {
    // there's a repeat, which means there's a cycle
    let cycle_loads = [];
    cycle_loads.push(map.get(grid_key)[1]);
    let cycle_keys = [];
    cycle_keys.push(grid_key);
    
    let curr_grid = map.get(grid_key)[0];

    while (!cycle_keys.includes(getAsString(curr_grid))) {
        const [next_grid, current_sum] = map.get(getAsString(curr_grid));
        cycle_loads.push(current_sum);
        cycle_keys.push(getAsString(curr_grid));
          curr_grid = next_grid;
    }

    console.log(cycle_loads[(1000000000 - cycle) % cycle_loads.length]);
    break;

  }

  let current_sum = calculateLoad(tilted_grid);
  tilted_grid = nextCycle(tilted_grid);
  map.set(grid_key, [tilted_grid, current_sum]);

}

require("fs").writeFile(
  "day14_test.txt",
  tilted_grid
    .map(function (v) {
      return v.join("");
    })
    .join("\n"),
  function (err) {
    console.log(err ? "Error :" + err : "ok");
  },
);


