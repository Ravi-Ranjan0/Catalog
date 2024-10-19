const fs = require("fs");

const data = JSON.parse(fs.readFileSync("input.json"));

function decodeY(base, value) {
  return parseInt(value, base);
}

let points = [];
for (let key in data) {
  if (key !== "keys") {
    const x = parseInt(key);
    const base = parseInt(data[key].base);
    const y = decodeY(base, data[key].value);
    points.push([x, y]);
  }
}

function decodeY(base, value) {
  return parseInt(value, base);
}

function parseInput(filename) {
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));
  const { n, k } = data.keys;

  let points = [];
  for (let key in data) {
    if (key !== "keys") {
      const x = parseInt(key);
      const base = parseInt(data[key].base);
      const y = decodeY(base, data[key].value);
      points.push([x, y]);
    }
  }
  return { points, k };
}

function lagrangeInterpolation(points, k) {
  let result = 0;

  for (let i = 0; i < k; i++) {
    const [xi, yi] = points[i];
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        const [xj] = points[j];
        term *= (0 - xj) / (xi - xj);
      }
    }

    result += term;
  }
  return result;
}

function solvePolynomial(filename) {
  const { points, k } = parseInput(filename);
  const constantTerm = lagrangeInterpolation(points, k);
  console.log(`The secret (constant term c) is: ${Math.round(constantTerm)}`);
}

solvePolynomial("input.json");
