const fs = require("fs");
const data = fs.readFileSync("day4_input.txt", "utf-8");

const test = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

let lines = data.split('\n');

let copies = [];

let games = lines.map((line) => {
  copies.push(1);
  return line.split(':')[1]
    .split('|')
    .map((sets) => {
      return sets.trim()
        .split(" ")
        .filter((entry) => entry.length > 0);
    });
});

let ans = games.reduce((total, curr, idx) => {
  let winners = new Set(curr[0]);

  let matches = curr[1].reduce((matches, entry) => {
    if (winners.has(entry)) matches++;
    return matches;
  }, 0);

  while (matches > 0) {
    copies[idx + matches] += copies[idx];
    matches--;
  }

  return total + copies[idx];
}, 0);

console.log(ans);
