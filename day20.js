let real = `&kl -> ll
%vd -> ff, mb
%dx -> hb, fx
%jj -> xt, th
%ld -> fq, ff
%bn -> ff, lg
%mv -> hb, mx
%mx -> xp
%qm -> gz, tj
%zd -> zp
%tq -> mf
&vm -> ll
%qr -> jj
%bv -> th, lr
%rf -> lq, tj
broadcaster -> lp, fn, tp, zz
%rk -> rc, th
&tj -> xh, gv, gz, bt, ct, vb, lp
%dg -> rf, tj
%xt -> rk, th
%fq -> ff
%gz -> dg
%rl -> hb
%rc -> st, th
%km -> fz, hb
%gv -> ct
%lr -> tq
%lg -> vd
%jh -> th
%rs -> sq, ff
%bt -> kc
%mf -> th, qr
%xf -> km
%tp -> hb, sv
%ch -> hb, mv
%xp -> hb, xf
%xh -> js
%fz -> hb, dx
%zp -> bn
&kv -> ll
&ll -> rx
%zz -> fj, ff
%lp -> gv, tj
&vb -> ll
&th -> tq, lr, vm, fn, qr
%sq -> zd, ff
%st -> th, jh
%fx -> rl, hb
%fj -> rs
%lq -> tj
%fn -> th, bv
%ct -> xh
&ff -> kl, zd, lg, zz, fj, zp
%js -> tj, bt
%mb -> ld, ff
&hb -> sv, xf, kv, tp, mx
%kc -> qm, tj
%sv -> ch`;

let test = `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`;

let test1 = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

let input = real;

let next_module = new Map();

input.split("\n").forEach((line) => {
  let arr = line.replaceAll(" ", "").split("->");
    if(arr[0] == "broadcaster") {
        next_module.set(arr[0], ["broadcaster", arr[1].replaceAll(" ", "").split(","), 0]);
    } else {
      let type = arr[0].substring(0, 1);
      let name = arr[0].substring(1, arr[0].length);
      if (type == "%") {
        next_module.set(name, [type, arr[1].replaceAll(" ", "").split(","), 0]);
      } else if (type == "&") {
        let input_modules = new Map();

        input.split("\n").forEach((line) => {
          line.replaceAll(" ", "").split("->")[1].split(",").forEach((target_module) => {
            if (target_module == name) {
              input_modules.set(line.replaceAll(" ", "").split("->")[0].substring(1, line.replaceAll(" ", "").split("->")[0].length), 0);
            }
          });
        }); 
        
        
        next_module.set(name, [type, arr[1].replaceAll(" ", "").split(","), input_modules]);

      }
    }  
});

  
let pulses = [0, 0];
let queue = [];

let rx_input_high_pulses = [];

let b1 = true;
let b2 = true;
let b3 = true;
let b4 = true; 

let i = 0;
while (!(!b1 && !b2 && !b3 && !b4)) {
  i++; 
//}
//for (let i = 0; i < 1000000; i++) {
  pulses[0]++;
  queue.push(["button", "broadcaster", 0]);

  while (queue.length > 0) {
    let [prev, curr, mag] = queue.shift(); 
    
    if (prev == "kv" && curr == "ll" && mag == 1 && b1) {
      rx_input_high_pulses.push(i);
      b1 = false;
    }
    if (prev == "vb" && curr == "ll" && mag == 1 && b2) {
      rx_input_high_pulses.push(i);
      b2 = false;
    }
    if (prev == "vm" && curr == "ll" && mag == 1 && b3) {
      rx_input_high_pulses.push(i);
      b3 = false;
    }
    if (prev == "kl" && curr == "ll" && mag == 1 && b4) {
      rx_input_high_pulses.push(i);
      b4 = false;
    }




    if (curr == "broadcaster") {
      next_module.get("broadcaster")[1].forEach((module) => {
        queue.push(["broadcaster", module, mag]);
        pulses[mag]++;
      });
    }
      else if (next_module.get(curr) == undefined) {
        // end
      }
    else {
      let type = next_module.get(curr)[0];

      if (type == "%" && mag == "0") {
        let on_or_off = next_module.get(curr)[2];
        if (on_or_off == 0) {
          next_module.set(curr, [type, next_module.get(curr)[1], 1]); 
          next_module.get(curr)[1].forEach((module) => {
            queue.push([curr, module, 1]); 
            pulses[1]++; 
          });
        } else {
          next_module.set(curr, [type, next_module.get(curr)[1], 0]); 
          next_module.get(curr)[1].forEach((module) => {
            queue.push([curr, module, 0]); 
            pulses[0]++;
          });
        }
      } else if (type =="&") {
        next_module.get(curr)[2].set(prev, mag);
        let pulse = 0;
        next_module.get(curr)[2].forEach((mem_pulse) => {
          if(mem_pulse == 0) pulse = 1;
        })
        next_module.get(curr)[1].forEach((module) => {
          queue.push([curr, module, pulse]); 
          pulses[pulse]++; 
        });
      }
    }

    
    
  }
  
}

//console.log(pulses[0] * pulses[1]); 
console.log(rx_input_high_pulses);

/*

button -low-> broadcaster
broadcaster -low-> a
broadcaster -low-> b
broadcaster -low-> c
a -high-> b
b -high-> c
c -high-> inv
inv -low-> a
a -low-> b
b -low-> c
c -low-> inv
inv -high-> a

broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output

button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -high-> output
b -high-> con
con -low-> output

button -low-> broadcaster
broadcaster -low-> a
a -low-> inv
a -low-> con
inv -high-> b
con -high-> output

button -low-> broadcaster
broadcaster -low-> a
a -high-> inv
a -high-> con
inv -low-> b
con -low-> output
b -low-> con
con -high-> output

button -low-> broadcaster
broadcaster -low-> a
a -low-> inv
a -low-> con
inv -high-> b
con -high-> output
*/