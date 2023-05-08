const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");

const separatorIdx = lines.findIndex((line) => line === "");

function getCrates(): string[][] {
  const crateData = lines.slice(0, separatorIdx);

  const crateEnumerationLine = crateData[crateData.length - 1];

  const crateCount = +crateEnumerationLine.slice(
    -2 /* there is whitespace on the end of line */
  );

  // n * 4(whitespace) + 1 (there is whitespace on the beginning of line)
  const cratePositions = new Array(crateCount)
    .fill(undefined)
    .map((_, i) => i * 4 + 1);

  const crateLines = crateData.slice(0, crateData.length - 1);

  const crates: string[][] = new Array(cratePositions.length)
    .fill(undefined)
    .map(() => []);

  for (const line of crateLines.reverse()) {
    // reversing lines to read data as stacks, from bottom to top
    cratePositions.forEach((crateIdx, i) => {
      const char = line[crateIdx];

      if (char !== " ") {
        crates[i].push(char);
      }
    });
  }

  return crates;
}

function parseInstructions(): number[][] {
  const instructions = lines.slice(separatorIdx + 1);

  const parsed: number[][] = [];
  for (const instruction of instructions) {
    const [amount, from, to] = instruction
      .split(" ")
      .filter((elem) => !Number.isNaN(parseInt(elem)))
      .map((value) => parseInt(value));

    parsed.push([amount, from - 1, to - 1]);
  }

  return parsed;
}

const instructions = parseInstructions();

const part1Crates = getCrates();

for (const [amount, from, to] of instructions) {
  const current = part1Crates[from];

  const destination = part1Crates[to];

  let i = amount;
  while (i) {
    destination.push(current.pop() as string);
    i--;
  }
}

let pt1 = "";

for (const crate of part1Crates) {
  pt1 += crate[crate.length - 1];
}

console.log(`Part 1: ${pt1}`);

const part2Crates = getCrates();

for (const [amount, from, to] of instructions) {
  const current = part2Crates[from];

  const destination = part2Crates[to];

  const cratesToMove = current.slice(-amount);

  cratesToMove.forEach((crate) => {
    current.pop();
    destination.push(crate);
  });
}

let pt2 = "";

for (const crate of part2Crates) {
  pt2 += crate[crate.length - 1];
}

console.log(`Part 2: ${pt2}`);
