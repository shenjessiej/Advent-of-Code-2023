const fs = require("fs");
const data = fs.readFileSync("day9_input.txt", "utf-8");

test = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

let sequences = data.split("\n").map((line) => {
  return line.split(" ");});

sequences = sequences.map((line) => {
  return line.map((nums) => {
    return Number(nums);
  })
})

//console.log(sequences);

sequences = sequences.map((sequence) => {
  //console.log(sequence);

  let all_zeros = false;
  let next_sequences = [];
  next_sequences.push(sequence);
  let prev_sequence = sequence;

  while (!all_zeros) {
    let next_sequence = [];
    let all_zeros_check = true;

    for (i = 0; i < prev_sequence.length - 1; i++) {
      next_sequence.push(prev_sequence[i+1] - prev_sequence[i]);
      if (prev_sequence[i+1] - prev_sequence[i] != 0) {
          all_zeros_check = false;
      }
    }

    next_sequences.push(next_sequence);
    prev_sequence = next_sequence;
    all_zeros = all_zeros_check; 
  }

  return next_sequences;
});

//console.log(sequences);

let total = 0;

sequences.forEach((sequence) => {
  for (let i = sequence.length-2; i >= 0; i--) {
    sequence[i].unshift(sequence[i][0] - sequence[i+1][0]);
  }

  total += sequence[0][0];
});

//console.log(sequences);
console.log(total);