const input = await Deno.readTextFile("./input.txt");

const lines = input.split("\n");

let currentElf = 0;

const caloriesByElf: number[] = lines.reduce((acc, line) => {
  if (!acc[currentElf]) acc[currentElf] = 0;

  if (line === "") {
    currentElf++;
  } else {
    acc[currentElf] += Number(line);
  }

  return acc;
}, [] as number[]);

caloriesByElf.sort(function (a, b) {
  return b - a;
});

// part 1
console.log(caloriesByElf[0]);

// part 2
console.log(
  caloriesByElf.slice(0, 3).reduce(function (acc, curr) {
    return acc + curr;
  }, 0)
);
