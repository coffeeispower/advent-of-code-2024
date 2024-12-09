import { count, window } from "../utils";

function parseInput(input: string): number[][] {
    return input
        .split("\n")
        .map((line) => line.split(" ").map((n) => Number.parseInt(n)));
}
function checkDifference(difference: number, direction: number): boolean {
    return (
        Math.abs(difference) > 0 &&
        Math.abs(difference) < 4 &&
        direction === Math.sign(difference)
    );
}

function checkReportPart1(report: number[]): boolean {
    let safe = true;
    const direction = Math.sign(report[1] - report[0]);
    window(report, 2, ([v1, v2]) => {
        safe = checkDifference(v2 - v1, direction);
        return safe;
    });
    return safe;
}
export function part1(input: string): number {
    const parsedInput = parseInput(input);
    return count(parsedInput, checkReportPart1);
}



function checkReportPart2(report: number[]): boolean {
    if(checkReportPart1(report)) return true;
    for (
        let levelIndex = 0;
        levelIndex <= report.length - 1;
        levelIndex++
    ) {
        const reportWithoutLevel = report.toSpliced(levelIndex, 1);
        if (checkReportPart1(reportWithoutLevel)) {
            return true;
        }
    }
    return false;
}

export function part2(input: string): number {
    const parsedInput = parseInput(input);
    return count(parsedInput, checkReportPart2);
}
