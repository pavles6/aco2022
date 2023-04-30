function getDuplicateItem(str: string): string {
  const middle = Math.floor(str.length / 2);
  const seen = new Set();

  for (let i = 0; i < middle; i++) {
    seen.add(str[i]);
  }

  for (let i = middle; i < str.length; i++) {
    const curr = str[i];
    if (seen.has(curr)) {
      return curr;
    }
  }

  throw new Error("oops");
}

// uppercase letters: 27-52 -> charCode - 38
// lowercase letters: 1-26 -> charCode - 96
function getPriorityValue(item: string): number {
  const charCode = item.charCodeAt(0);

  if (!item) {
    return 0;
  }

  // uppercase letters
  if (charCode >= 27 && charCode <= 90) {
    return charCode - 38;
  }

  // lowercase letters
  return charCode - 96;
}

function findGroupBadge(group: string[]): number {
  const badges: number[] = new Array(52).fill(0);

  for (const items of group) {
    const seenPerBackpack = new Set();

    for (let i = 0; i < items.length; i++) {
      if (seenPerBackpack.has(items[i])) {
        continue;
      }

      seenPerBackpack.add(items[i]);

      badges[getPriorityValue(items[i]) - 1]++;
    }
  }

  for (let i = 0; i < badges.length; i++) {
    if (badges[i] === 3) {
      return i + 1;
    }
  }

  throw new Error("oops");
}

const input = await Deno.readTextFile("./input.txt");

let itemsSum = 0;
let groupsSum = 0;

input.split("\n").forEach((line, i, backpacks) => {
  const repeatedItem = getDuplicateItem(line);
  itemsSum += getPriorityValue(repeatedItem);

  if ((i + 1) % 3 === 0) {
    const group = backpacks.slice(i - 2, i + 1);

    groupsSum += findGroupBadge(group);
  }
});

console.log(itemsSum);
console.log(groupsSum);
