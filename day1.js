const fs = require("fs");

const short = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
8seventhreesevenseven`;
const data = fs.readFileSync("day1_input.txt", "utf-8");

const numberLettersArray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

let total = 0;
const arrayOfLines = data.split('\n');

for (let elem of arrayOfLines) {
  let numberString = "";

  // Find the first number 

  let indexOfFirstNumber = -1;

  for (let i = 0; i < elem.length; i++) {
    // find the index where the first number as a digit appears
    if (elem.charAt(i) > "0" && elem.charAt(i) <= "9") {
      indexOfFirstNumber = i;
      break;
    }
  }

  // if there is a digit at the start, that's our first number
  if (indexOfFirstNumber == 0) {
    numberString += elem.charAt(0);
  }
  // else, check the substring
  else {
    let firstCharactersSubstring = "";

    // no digits in the string, full string is substring
    if (indexOfFirstNumber == -1) {
      firstCharactersSubstring = elem;
    } else { // take substring
      firstCharactersSubstring = elem.substring(0, indexOfFirstNumber);
    }
    //console.log(firstCharactersSubstring);

    // if the index of the first number is greater than 0, e.g. it exists
    let x = firstCharactersSubstring.length;
    let y = "";

    // check if one of the number as letters exists in the substring; if multiple, take the lowest indexOf 
    for (let j = 0; j < numberLettersArray.length; j++) {
      if (firstCharactersSubstring.indexOf(numberLettersArray[j]) < x && firstCharactersSubstring.indexOf(numberLettersArray[j]) > -1) {
        x = firstCharactersSubstring.indexOf(numberLettersArray[j]);
        y = j + 1 + "";
      }
    }

    // if we do not find a matching number as letters in the substring, then the first number will be the number as digit
    if (y == "") {
      y = elem.charAt(indexOfFirstNumber);
    }

    numberString += y;
  }


  //console.log(numberString);

  // Find the second number


  let indexOfSecondNumber = -1;

  for (let i = elem.length - 1; i >= 0; i--) {
    // find the index where the first number as a digit appears from the right
    if (elem.charAt(i) > "0" && elem.charAt(i) <= "9") {
      indexOfSecondNumber = i;
      break;
    }
  }

  // if there is a digit at the end, that's our second number
  if (indexOfSecondNumber == elem.length - 1) {
    numberString += elem.charAt(indexOfSecondNumber);
  }
  // else, check the substring
  else {
    let secondCharactersSubstring = "";

    // no digits in the string, full string is substring
    if (indexOfSecondNumber == -1) {
      secondCharactersSubstring = elem;
    } else { // take substring
      secondCharactersSubstring = elem.substring(indexOfSecondNumber, elem.length);
    }
    //console.log(firstCharactersSubstring);

    let x = 0;
    let y = "";

    // check if one of the number as letters exists in the substring; if multiple, take the highest indexOf 
    for (let j = 0; j < numberLettersArray.length; j++) {
      if (secondCharactersSubstring.lastIndexOf(numberLettersArray[j]) > x && secondCharactersSubstring.lastIndexOf(numberLettersArray[j]) > -1) {
        x = secondCharactersSubstring.lastIndexOf(numberLettersArray[j]);
        y = j + 1 + "";
      }
    }

    // if we do not find a matching number as letters in the substring, then the first number will be the number as digit
    if (y == "") {
      y = elem.charAt(indexOfSecondNumber);
    }

    numberString += y;
  }

  // Add two digit number to total 

  total += Number(numberString);
}

console.log(total); 