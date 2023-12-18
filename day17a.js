let test = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

let grid = test.split("\n").map((line) => {
  return line.split("");
});

let visited = [];
let distances = [];
let unvisited = [];

for (let i = 0; i < grid.length; i++) {
    distances[i] = [];
  for (let j = 0; j < grid[0].length; j++) {
      distances[i][j] = Number.MAX_VALUE; 
  }
}
distances[0][0] = 0;


let start = [0, 0, 0, "right"];

while (visited.length < grid.length * grid[0].length) {
  // visit neighbors

  
}