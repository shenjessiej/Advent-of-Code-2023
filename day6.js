let time_data = `62649190`;
let distance_data = `553101014731074`;

let times = time_data.split(" ");
console.log(times);

let distances = distance_data.split(" ");
console.log(distances);

let wins_by_race = times.map((time, idx) => {
  let distance_to_beat = Number(distances[idx]);
  let total_time = Number(time);

  let wins = 0;

  for(let hold_time = 0; hold_time < total_time; hold_time++) {
    let distance_traveled = hold_time * (total_time - hold_time);
    if (distance_traveled > distance_to_beat) {
      wins++;
    }
  }

  return wins; 
})

let ans = wins_by_race.reduce((product, current) => {
  return product * current;
}, 1)
console.log(ans);