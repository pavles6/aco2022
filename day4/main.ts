const input = await Deno.readTextFile("./input.txt");

const containedPairs = input
  .split("\n")
  .map((line) =>
    line
      .split(",")
      .map((range: string) =>
        range.split("-").map((num: string) => parseInt(num))
      )
  )
  .filter((pair) => {
    const [first, second] = pair;

    return (
      (first[0] <= second[0] && first[1] >= second[1]) ||
      (first[0] >= second[0] && first[1] <= second[1])
    );
  }).length;

console.log(containedPairs);

const overlappedPairs = input
  .split("\n")
  .map((line) =>
    line
      .split(",")
      .map((range: string) =>
        range.split("-").map((num: string) => parseInt(num))
      )
  )
  .filter((pair) => {
    const [first, second] = pair;

    return !(
      (first[0] < second[0] && first[1] < second[0]) ||
      (second[0] < first[0] && second[1] < first[0])
    );
  }).length;

console.log(overlappedPairs);
