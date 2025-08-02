export function generateRandomArr(length: number, max: number, min: number) {
  const resultsArr: number[] = [];
  for (let i = 0; i < length; i++) {
    const newNumber = Math.floor(Math.random() * (max - min)) + min;
    resultsArr.includes(newNumber) ? (length += 1) : resultsArr.push(newNumber);
  }
  return resultsArr;
}
