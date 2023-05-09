const input = await Deno.readTextFile("./input.txt");

function findPacketStart(str: string, start: number): number {
  const seen = new Map<string, number>();

  for (let i = start; i < start + 4 && start + 4 < str.length; i++) {
    if (seen.has(str[i])) {
      return findPacketStart(str, (seen.get(str[i]) as number) + 1);
    }

    seen.set(str[i], i);

    if (seen.size === 4) {
      return i + 1; // Adding 1 to idx to satisfy the answer
    }
  }

  return -1;
}

console.log(`Start of packet marker: ${findPacketStart(input, 0)}`);

function findMessageStart(str: string, start: number): number {
  const seen = new Map<string, number>();

  for (let i = start; i < start + 14 && start + 14 < str.length; i++) {
    if (seen.has(str[i])) {
      return findMessageStart(str, (seen.get(str[i]) as number) + 1);
    }

    seen.set(str[i], i);

    if (seen.size === 14) {
      return i + 1; // Adding 1 to idx to satisfy the answer
    }
  }

  return -1;
}

console.log(`Start of message marker: ${findMessageStart(input, 0)}`);
