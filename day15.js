const fs = require("fs");
const data = fs.readFileSync("day15_input.txt", "utf-8");

let test = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

let steps = data.split(",");

function hash_func(string) {
  let val = 0;
  for (let i = 0; i < string.length; i++) {
    val += string.charCodeAt(i);
    val *= 17;
    val = val % 256;
  }
  return val;
}

let boxes = new Map();

steps.forEach((step) => {
  if (step.includes("=")) {
    let [label, lens_num] = step.split("=");
    let hash = hash_func(label);

    if (boxes.has(hash)) {
      let lenses = boxes.get(hash);
      let lens_added = false;
      lenses.forEach((lens, index) => {
        if (lens[0] == label) {
          lenses[index] = [label, lens_num];
          lens_added = true;
        }
      });
      if (!lens_added) {
        lenses.push([label, lens_num]);
      }
      boxes.set(hash, lenses);
    } else {
      let lenses = [];
      lenses.push([label, lens_num]);
      boxes.set(hash, lenses);
    }
  } else if (step.includes("-")) {
    let [label] = step.split("-");
    let hash = hash_func(label);

    if (boxes.has(hash)) {
      let lenses = boxes.get(hash);

      lenses.forEach((lens, index) => {
        if (lens[0] == label) {
          lenses.splice(index, 1);
        }
      });
    }
  }
});


let total = 0;
[...boxes.keys()].forEach((box_num) => {

  let lenses = boxes.get(box_num);
  for (let i = 0; i < lenses.length; i++) {
    total += (Number(box_num) + 1) * (i+1) * Number(lenses[i][1]); 
  }
})

console.log(total); 