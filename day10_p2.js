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

distances[start_row][start_col] = "X";

let found_end = false;
let one_prev = [start_row, start_col];
let one = [];

let outside = "left"; 
distances[one_prev[0]][one_prev[1]-1] = "I"; 

one = [start_row-1, start_col];
console.log(pipes[one[0]][one[1]]);

let inside_tiles = 1;
while (!found_end) {
  distances[one[0]][one[1]] = "X";

  if (outside == "right" && one[1]+1 < distances[0].length) {
    if (distances[one[0]][one[1] + 1] != "X") {
      distances[one[0]][one[1] + 1] = "I";
      inside_tiles++;
    }
  } else if (outside == "left" && one[1]-1 >= 0) {
    if (distances[one[0]][one[1] - 1] != "X") {
      distances[one[0]][one[1] - 1] = "I";
      inside_tiles++;
    }
  } else if (outside == "above" && one[0]-1 >= 0) {
    if (distances[one[0]-1][one[1]] != "X") {
        distances[one[0]-1][one[1]] = "I";
      inside_tiles++;
    }
  } else if (outside == "below" && one[0]+1 < distances.length) {
  if (distances[one[0]+1][one[1]] != "X") {
      distances[one[0]+1][one[1]] = "I";
    inside_tiles++;
  }
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
  if (one_cell == "-" && coming_from == "left") {
    one = [one[0], one[1] + 1];
  } 
  else if (one_cell == "-" && coming_from == "right")
    one = [one[0], one[1] - 1];
  else if (one_cell == "|" && coming_from == "north")
    one = [one[0] + 1, one[1]];
  else if (one_cell == "|" && coming_from == "south")
    one = [one[0] - 1, one[1]];
  else if (one_cell == "J" && coming_from == "north") {
    one = [one[0], one[1] - 1];
    if (outside == "left") {
      outside = "above"; 
    } else if (outside == "right") {
      outside = "below";
      if (one[0] + 1 < distances.length && one[1] + 1 < distances[0].length) {
        if (distances[one[0] + 1][one[1] + 1] == ".") {
          distances[one[0] + 1][one[1] + 1] = "I";
          inside_tiles++;

        }
      }
    }
  }
  else if (one_cell == "J" && coming_from == "left") { 
    one = [one[0] - 1, one[1]];
    if (outside == "above") {
      outside = "left"; 
    } else if (outside == "below") {
      outside = "right"; 
      if (one[0] + 1 < distances.length && one[1] + 1 < distances[0].length) {
        if (distances[one[0] + 1][one[1] + 1] == ".") {
          inside_tiles++;
          distances[one[0] + 1][one[1] + 1] = "I";
        }
      }
    }
  }
  else if (one_cell == "L" && coming_from == "north") {
    one = [one[0], one[1] + 1];
    if (outside == "right") {
      outside = "above";
    } else if (outside == "left") {
      outside = "below";
      if (one[0] + 1 < distances.length && one[1] - 1 >= 0) {
        if (distances[one[0] + 1][one[1] - 1] == ".") {
          inside_tiles++;
          distances[one[0] + 1][one[1] - 1] = "I";
        }
      }
    }
  }
  else if (one_cell == "L" && coming_from == "right") {
    one = [one[0] - 1, one[1]];
    if (outside == "above") {
      outside = "right";
    } else if (outside == "below") {
      outside = "left";
      if (one[0] + 1 < distances.length && one[1] - 1 >= 0) {
        if (distances[one[0] + 1][one[1] - 1] == ".") {
          distances[one[0] + 1][one[1] - 1] = "I";
          inside_tiles++;
        } 
      }
    }
  }
  else if (one_cell == "7" && coming_from == "left") {
    one = [one[0] + 1, one[1]];
    if (outside == "below") {
      outside = "left"; 
    } else if (outside == "above") {
      outside = "right";
        if (one[0] - 1 >= 0 && one[1] + 1 < distances[0].length) {
          if (distances[one[0]-1][one[1] +1] == ".") {
            inside_tiles++;
          distances[one[0] - 1][one[1] + 1] = "I";
          }
        }
    }
  }
  else if (one_cell == "7" && coming_from == "south") {
    one = [one[0], one[1] - 1];
    if (outside == "left") {
      outside = "below";
    } else if (outside == "right") {
      outside = "above";
      if (one[0] - 1 >= 0 && one[1] + 1 < distances[0].length) {
        if (distances[one[0] - 1][one[1] + 1] == ".") {
          distances[one[0] - 1][one[1] + 1] = "I";
          inside_tiles++;
        } 
      }
    }
  }
  else if (one_cell == "F" && coming_from == "right") {
    one = [one[0] + 1, one[1]];
    if (outside == "below") {
      outside = "right";
    } else if (outside == "above") {
      outside = "left";
      if (one[0] - 1 >= 0 && one[1] - 1 >= 0) {
        if (distances[one[0] - 1][one[1] - 1] == ".") {
          distances[one[0] - 1][one[1] - 1] = "I";
          inside_tiles++;
        }
      }
    }
  }
  else if (one_cell == "F" && coming_from == "south") {
    one = [one[0], one[1] + 1];
    if (outside == "right") {
      outside = "below";
    } else if (outside == "left") {
      outside = "above";
      if (one[0] - 1 >= 0 && one[1] - 1 >= 0) {
        if (distances[one[0] - 1][one[1] - 1] == ".") {
          distances[one[0] - 1][one[1] - 1] = "I";
          inside_tiles++;
        }
      }
    }
  }


  if (pipes[one[0]][one[1]] == "S") {
    found_end = true;
  }

}

//console.log(distances);
//fs.writeFileSync('distances.txt', JSON.stringify(distances));



let temp = 0;
distances.forEach((line, col) => {
  line.forEach((cell, row) => {
    if (cell == ".") {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (col+i >= 0 && col+i < distances.length && row+j >= 0 && row+j < distances[0].length) {
            if (distances[col+i][row+j] == "I") {
              distances[col][row] = "I";
            }
          }
        }
      }
    }
  })
})

distances.forEach((line) => {
  line.forEach((cell) => {
    if (cell == "I") {
      temp++;
    }
  })
})

require("fs").writeFile(
     'distances.txt',
  distances.map(function(v){ return v.join('') }).join('\n'),
     function (err) { console.log(err ? 'Error :'+err : 'ok') }
);

console.log(temp);