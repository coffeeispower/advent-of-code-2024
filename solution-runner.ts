import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { basename } from "node:path";
export function readInput(
    filename: string,
    example = process.argv.includes("--example", 2),
): string {
    return readFileSync(
        `inputs/${basename(filename, ".ts")}/${example ? "example" : "real"}.txt`,
        "utf-8",
    );
}

export function runSolution(
    filename: string,
    part1: (input: string) => number,
    part2?: (input: string) => number,
): void {
    const input = readInput(filename);
    console.log("---------------------------------");
    console.time("part1");
    console.log(`Part 1: ${part1(input)}`);
    console.timeEnd("part1");
    console.log("---------------------------------");
    if (part2) {
        console.time("part2");
        console.log(`Part 2: ${part2(input)}`);
        console.timeEnd("part2");
    } else {
        console.warn("Part 2: Not implemented yet");
    }
}

const day = process.argv
    .map((a) => Number(a))
    .filter((a) => !Number.isNaN(a))[0];
if (!day) {
    console.error("Please provide a day number as argument");
    process.exit(1);
}
if (day < 1 || day > 25) {
    console.error("Day number must be between 1 and 25");
    process.exit(1);
}
const filename = `./solutions/day${day}.ts`;
if (!existsSync(filename)) {
    console.error(`Solution for day ${day} does not exist`);
    process.exit(1);
}
const { part1, part2 } = await import(filename);
if (!part1) {
    console.error(`Part 1 for day ${day} is not implemented yet`);
    process.exit(1);
}
runSolution(filename, part1, part2);
