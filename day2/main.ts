// rock -> A or X
// paper -> B or Y
// scissors -> C or Z

// outcome points:
// win -> 6
// draw -> 3
// lose -> 0

// bonus points by picked symbol
// rock -> 1
// paper -> 2
// scissors -> 3

type Symbol = "Rock" | "Paper" | "Scissors";

// part 2
// X -> lose
// Y -> draw
// Z -> win
type SuggestedOutcome = "X" | "Y" | "Z";

const bonusPoints = new Map<Symbol, number>();

bonusPoints.set("Rock", 1);
bonusPoints.set("Paper", 2);
bonusPoints.set("Scissors", 3);

function characterToSymbol(c: string): Symbol {
  if (c === "A" || c === "X") return "Rock";
  if (c === "B" || c === "Y") return "Paper";
  if (c === "C" || c === "Z") return "Scissors";

  throw new Error("Invalid symbol");
}

function isWin(me: Symbol, opponent: Symbol): boolean {
  if (me === "Rock" && opponent === "Scissors") return true;
  if (me === "Paper" && opponent === "Rock") return true;
  if (me === "Scissors" && opponent === "Paper") return true;

  return false;
}

function calculateSymbol(opponent: Symbol, outcome: SuggestedOutcome): Symbol {
  if (outcome === "Z") {
    if (opponent === "Rock") return "Paper";
    if (opponent === "Paper") return "Scissors";
    if (opponent === "Scissors") return "Rock";
  }
  if (outcome === "X") {
    if (opponent === "Rock") return "Scissors";
    if (opponent === "Paper") return "Rock";
    if (opponent === "Scissors") return "Paper";
  }
  // draw
  return opponent;
}

function isDraw(me: Symbol, opponent: Symbol): boolean {
  return me === opponent;
}

function getPointsByRound(me: Symbol, opponent: Symbol): number {
  let roundPoints = 0;

  if (isWin(me, opponent)) roundPoints += 6;
  if (isDraw(me, opponent)) roundPoints += 3;

  return roundPoints + (bonusPoints.get(me) as number);
}

const input = await Deno.readTextFile("./input.txt");

let part1Points = 0;
let part2Points = 0;

for (const line of input.split("\n")) {
  // part 1
  // char1 -> opponent
  // char 2 -> me
  const [char1, char2] = line.split(" ");

  const me = characterToSymbol(char2);
  const opponent = characterToSymbol(char1);

  part1Points += getPointsByRound(me, opponent);

  // part 2
  // char 1 -> opponent
  // char 2 -> suggested outcome
  const part2Symbol = calculateSymbol(opponent, char2 as SuggestedOutcome);

  part2Points += getPointsByRound(part2Symbol, opponent);
}

console.log(part1Points);
console.log(part2Points);
