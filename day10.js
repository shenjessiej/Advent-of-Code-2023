const fs = require("fs");
const data = fs.readFileSync("day10_input.txt", "utf-8");

let test = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

let pipes = data.split("\n");
pipes = pipes.map((line) => {
  return line.split("");
});
let distances = [];

let start_row = 0;
let start_col = 0;

pipes.forEach((line, row) => {
  let distances_row = [];
  line.forEach((cell, col) => {
    if (cell == "S") {
      start_row = row;
      start_col = col;
    }
    distances_row.push(".");
  });
  distances.push(distances_row);
});

distances[start_row][start_col] = 0;

let found_end = false;
let one_prev = [start_row, start_col];
let one = [];
let two_prev = [start_row, start_col];
let two = [];

// update pointer one
for (let i = -1; i <= 1; i++) {
  for (let j = -1; j <= 1; j++) {
    cur_row_index = one_prev[0] + i;
    cur_col_index = one_prev[1] + j;
    if (cur_row_index < 0) cur_row_index = 0;
    if (cur_row_index >= pipes.length) cur_row_index = pipes.length - 1;
    if (cur_col_index < 0) cur_col_index = 0;
    if (cur_col_index >= pipes[0].length) cur_col_index = pipes[0].length - 1;

    let cur_cell = pipes[cur_row_index][cur_col_index];
    if (
      cur_cell == "F" ||
      cur_cell == "7" ||
      cur_cell == "J" ||
      cur_cell == "L" ||
      cur_cell == "-" ||
      cur_cell == "|"
    ) {
      one = [cur_row_index, cur_col_index];
      break;
    } else {
      //console.log("found S or .");
    }
  }
}

// update pointer 2
for (let i = -1; i <= 1; i++) {
  for (let j = -1; j <= 1; j++) {
    cur_row_index = two_prev[0] + i;
    cur_col_index = two_prev[1] + j;
    if (cur_row_index < 0) cur_row_index = 0;
    if (cur_row_index >= pipes.length) cur_row_index = pipes.length - 1;
    if (cur_col_index < 0) cur_col_index = 0;
    if (cur_col_index >= pipes[0].length) cur_col_index = pipes[0].length - 1;

    let cur_cell = pipes[cur_row_index][cur_col_index];
    if (
      cur_cell == "F" ||
      cur_cell == "7" ||
      cur_cell == "J" ||
      cur_cell == "L" ||
      cur_cell == "-" ||
      cur_cell == "|"
    ) {
      if (one[0] != cur_row_index && one[1] != cur_col_index) {
        two = [cur_row_index, cur_col_index];
      }
    } else {
      //console.log("found S or .");
    }
  }
}

//console.log(one);
//console.log(two);

//console.log(pipes[start_row][start_col-1]);
one = [start_row-1, start_col];
two = [start_row, start_col - 1];

//console.log(start_row);
//console.log(start_col);
//console.log(one);
//console.log(two);

let max_distance = 0;
while (!found_end) {
  if (distances[one[0]][one[1]] == ".") {
    distances[one[0]][one[1]] = "X";
    max_distance = Math.max(max_distance, distances[one[0]][one[1]]);
  }
  if (distances[two[0]][two[1]] == ".") {
    distances[two[0]][two[1]] = "X";
    max_distance = Math.max(max_distance, distances[two[0]][two[1]]);
  }

  // update pointer 1
  let coming_from = "";
  if (one[0] > one_prev[0]) {
    coming_from = "north";
  } else if (one[0] < one_prev[0]) {
    coming_from = "south";
  } else if (one[1] < one_prev[1]) {
    coming_from = "right";
  } else if (one[1] > one_prev[1]) {
    coming_from = "left";
  }
  //console.log(coming_from);

  let one_cell = pipes[one[0]][one[1]];

  one_prev = one;
  if (one_cell == "-" && coming_from == "left") one = [one[0], one[1] + 1];
  else if (one_cell == "-" && coming_from == "right")
    one = [one[0], one[1] - 1];
  else if (one_cell == "|" && coming_from == "north")
    one = [one[0] + 1, one[1]];
  else if (one_cell == "|" && coming_from == "south")
    one = [one[0] - 1, one[1]];
  else if (one_cell == "J" && coming_from == "north")
    one = [one[0], one[1] - 1];
  else if (one_cell == "J" && coming_from == "left") one = [one[0] - 1, one[1]];
  else if (one_cell == "L" && coming_from == "north")
    one = [one[0], one[1] + 1];
  else if (one_cell == "L" && coming_from == "right")
    one = [one[0] - 1, one[1]];
  else if (one_cell == "7" && coming_from == "left") one = [one[0] + 1, one[1]];
  else if (one_cell == "7" && coming_from == "south") {
    one = [one[0], one[1] - 1];
  }
  else if (one_cell == "F" && coming_from == "right")
    one = [one[0] + 1, one[1]];
  else if (one_cell == "F" && coming_from == "south")
    one = [one[0], one[1] + 1];

  //console.log(one);
  //console.log(one_prev);

  // update pointer 2
  //console.log(two);
  //console.log(two_prev);
  coming_from = "";
  if (two[0] > two_prev[0]) {
    coming_from = "north";
  } else if (two[0] < two_prev[0]) {
    coming_from = "south";
  } else if (two[1] < two_prev[1]) {
    coming_from = "right";
  } else if (two[1] > two_prev[1]) {
    coming_from = "left";
  }
  //console.log(coming_from);

  let two_cell = pipes[two[0]][two[1]];

  two_prev = two;
  if (two_cell == "-" && coming_from == "left") two = [two[0], two[1] + 1];
  else if (two_cell == "-" && coming_from == "right")
    two = [two[0], two[1] - 1];
  else if (two_cell == "|" && coming_from == "north")
    two = [two[0] + 1, two[1]];
  else if (two_cell == "|" && coming_from == "south")
    two = [two[0] - 1, two[1]];
  else if (two_cell == "J" && coming_from == "north")
    two = [two[0], two[1] - 1];
  else if (two_cell == "J" && coming_from == "left") two = [two[0] - 1, two[1]];
  else if (two_cell == "L" && coming_from == "north")
    two = [two[0], two[1] + 1];
  else if (two_cell == "L" && coming_from == "right")
    two = [two[0] - 1, two[1]];
  else if (two_cell == "7" && coming_from == "left") two = [two[0] + 1, two[1]];
  else if (two_cell == "7" && coming_from == "south")
    two = [two[0], two[1] - 1];
  else if (two_cell == "F" && coming_from == "right")
    two = [two[0] + 1, two[1]];
  else if (two_cell == "F" && coming_from == "south")
    two = [two[0], two[1] + 1];

  if (distances[one[0]][one[1]] != "." && distances[two[0]][two[1]] != ".") {
    found_end = true;
  }

  //console.log(distances);
}


//console.log(distances);
console.log(max_distance);
//fs.writeFileSync('distances.txt', JSON.stringify(distances));
require("fs").writeFile(
     'distances1.txt',
  distances.map(function(v){ return v.join('') }).join('\n'),
     function (err) { console.log(err ? 'Error :'+err : 'ok') }
);
