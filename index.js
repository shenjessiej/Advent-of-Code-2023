const fs = require("fs");
const data = fs.readFileSync("input.txt", "utf-8");

const test = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

let lines = data.split('\n'); 

const countMap = new Map();
countMap.set("red", 12);
countMap.set("green", 13);
countMap.set("blue", 14);

lines = lines.map((line) => {
  return line.split(':')[1];
});

lines = lines.map((line) => {
  return line.split(";");
});

lines = lines.map((game) => {
  return game.map((round) => {
    return round.split(",");
  })
});

lines = lines.map((game) => {
  return game.map((round) => {
    return round.map((count) => {
      count = count.trim();
      return count.split(" ");
    })
    
  })
})

let total = 0;
lines = lines.map((game) => {
  let power = 1;
  const maxCountMap = new Map();
  
  game.map((round) => {
    round.map((count) => {
      if(maxCountMap.has(count[1])) {
        maxCountMap.set(count[1], Math.max(Number(count[0]), maxCountMap.get(count[1])));
      } else {
        maxCountMap.set(count[1], count[0]);
      }
    });
  });

  maxCountMap.forEach((count) => {
    power *= Number(count); 
  })
  total += power;
});

console.log(total);