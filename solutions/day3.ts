export function part1(input: string): number {
    let result = 0;
    for (const match of input.matchAll(/mul\((\d+),(\d+)\)/g)) {
        const [, a, b] = match;
        result += Number.parseInt(a) * Number.parseInt(b);
    }
    return result;
}
export function part2(input: string) {
    let result = 0;
    let enabled = true;
    for (const match of input.matchAll(/(mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g)) {
        const [op, , a, b] = match;
        if(op.startsWith("mul(")) {
            if(!enabled) continue;
            result += Number.parseInt(a) * Number.parseInt(b);
        } else if(op === "do()") {
            enabled = true;
        } else if(op === "don't()") {
            enabled = false;
        }
    }
    return result;
}