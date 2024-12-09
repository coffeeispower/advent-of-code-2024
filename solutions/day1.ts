import { count } from "../utils";

function parseInput(input: string): [number[], number[]] {
    const parsedInput = input.split("\n").map((line) => line.split("   ").map((n) => Number.parseInt(n)));
    const transposed: [number[], number[]] = [[], []];
    for(let i = 0; i < 2; i++){
        const row = [];
        for(let j = 0; j < parsedInput.length; j++){
            row.push(parsedInput[j][i]);
        }
        transposed[i] = row;
    }
    return transposed;
}

export function part1(input: string): number {
    const parsedInput = parseInput(input);
    // sort the numbers of the 2 columns 
    parsedInput[0].sort((a, b) => a - b);
    parsedInput[1].sort((a, b) => a - b);

    // go through all the lines and find the difference between the number in the first column and the number in the second column
    let sum = 0;
    for(let i = 0; i < parsedInput[0].length; i++){
        sum += Math.abs(parsedInput[1][i] - parsedInput[0][i]);
    }
    return sum;
}


export function part2(input: string): number {
    const parsedInput = parseInput(input);
    let similarityScore = 0;
    for(let i = 0; i < parsedInput[0].length; i++){
        const countOnTheSecondList = count(parsedInput[1], (n) => n === parsedInput[0][i]);
        similarityScore += parsedInput[0][i] * countOnTheSecondList;
    }
    return similarityScore
}