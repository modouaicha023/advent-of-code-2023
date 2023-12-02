const f = require('fs');
const readline = require('readline');
const file = './input.txt';
let sumCalibrationValues = 0;
const patternsLetter = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const patternsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const r = readline.createInterface({
  input: f.createReadStream(file)
});
r.on('line', function (text) {
  let tabCalibration = [];
  let tabAllLetterNumberInLine = [];

  patternsLetter.map((patternNum) => {
    const firstIndex = text.indexOf(patternNum);
    const lastIndex = text.lastIndexOf(patternNum);

    if (firstIndex !== -1) {
      const array = [patternsNumber[patternsLetter.indexOf(patternNum)], firstIndex];
      tabAllLetterNumberInLine.push(array);
      if (lastIndex !== firstIndex && lastIndex !== -1) {
        const array1 = [patternsNumber[patternsLetter.indexOf(patternNum)], lastIndex]
        tabAllLetterNumberInLine.push(array1);
      }
    }
    tabAllLetterNumberInLine.sort((a, b) => a[1] - b[1]);
  });
  if (tabAllLetterNumberInLine.length > 1) {
    const firstLetterNumber = patternsLetter[patternsNumber.indexOf(tabAllLetterNumberInLine[0][0])];
    text = text.replace(`${firstLetterNumber}`, patternsNumber[patternsLetter.indexOf(firstLetterNumber)]);

    const lastIndexLetterNumber = patternsLetter[patternsNumber.indexOf(tabAllLetterNumberInLine[tabAllLetterNumberInLine.length - 1][0])];
    const indexLastLetterNumber = tabAllLetterNumberInLine[tabAllLetterNumberInLine.length - 1][1] - firstLetterNumber.length + 1;
    text = text.slice(0, indexLastLetterNumber) + text.slice(indexLastLetterNumber).replace(`${lastIndexLetterNumber}`, patternsNumber[patternsLetter.indexOf(lastIndexLetterNumber)]);
  }
  if (tabAllLetterNumberInLine.length === 1) {
    const firstLetterNumber = patternsLetter[patternsNumber.indexOf(tabAllLetterNumberInLine[0][0])];
    text = text.replace(`${firstLetterNumber}`, patternsNumber[patternsLetter.indexOf(firstLetterNumber)]);
  }
  text.split("").forEach((i) => {
    if (i.trim() !== "") {
      const convertNumber = parseInt(i);
      if (typeof convertNumber === 'number' && convertNumber !== null && convertNumber !== undefined && !isNaN(convertNumber)) {
        tabCalibration.push(convertNumber);
      }
    }
  });

  if (tabCalibration.length >= 2) {
    const calibnumber = Number(`${tabCalibration[0]}${tabCalibration[tabCalibration.length - 1]}`);
    sumCalibrationValues = sumCalibrationValues + calibnumber;
  } else if (tabCalibration.length === 1) {
    const calibnumber = Number(`${tabCalibration[0]}${tabCalibration[0]}`);
    sumCalibrationValues = sumCalibrationValues + calibnumber;
  }
  console.log(sumCalibrationValues) // Value = {part1 :  55447, part2: 54706}
});
