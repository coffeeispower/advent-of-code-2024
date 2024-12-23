import { slice2d } from "../utils";

export function part1(input: string): number {
    const KEYWORD = "XMAS";
    let occurrences = 0;
    // break down the input into a matrix of characters
    const matrix = input
        .split("\n")
        .map((line) => line.replaceAll(" ", "").split("").filter(Boolean))
        .filter(Boolean);

    // Check each line of the matrix for the keyword
    for (let positionY = 0; positionY < matrix.length; positionY++) {
        const line = matrix[positionY];
        for (
            let positionX = 0;
            positionX < line.length - KEYWORD.length + 1;
            positionX++
        ) {
            const lineSlice = line.slice(positionX, positionX + KEYWORD.length);
            if (
                lineSlice.join("") === KEYWORD ||
                lineSlice.toReversed().join("") === KEYWORD
            ) {
                occurrences++;
            }
        }
    }
    // Check each column of the matrix for the keyword
    for (let positionX = 0; positionX < matrix[0].length; positionX++) {
        for (
            let positionY = 0;
            positionY < matrix.length - KEYWORD.length + 1;
            positionY++
        ) {
            const columnSlice = matrix
                .slice(positionY, positionY + KEYWORD.length)
                .map((line) => line[positionX])
                .join("");
            console.log(columnSlice);
            if (
                columnSlice === KEYWORD ||
                columnSlice.split("").reverse().join("") === KEYWORD
            ) {
                occurrences++;
            }
        }
    }
    // iterate over the matrix using a 2d window with the size of the keyword
    for (
        let windowPositionX = 0;
        windowPositionX < matrix.length - KEYWORD.length + 1;
        windowPositionX++
    ) {
        for (
            let windowPositionY = 0;
            windowPositionY < matrix[0].length - KEYWORD.length + 1;
            windowPositionY++
        ) {
            // Check diagonally
            const diagonal1WordChars = new Array(KEYWORD.length);
            const diagonal2WordChars = new Array(KEYWORD.length);
            for (let i = 0; i < KEYWORD.length; i++) {
                diagonal1WordChars[i] =
                    matrix[windowPositionY + i][windowPositionX + i];
                diagonal2WordChars[i] =
                    matrix[windowPositionY + KEYWORD.length - 1 - i][
                        windowPositionX + i
                    ];
            }

            if (
                diagonal1WordChars.join("") === KEYWORD ||
                diagonal1WordChars.toReversed().join("") === KEYWORD
            ) {
                occurrences++;
            }
            if (
                diagonal2WordChars.join("") === KEYWORD ||
                diagonal2WordChars.toReversed().join("") === KEYWORD
            ) {
                occurrences++;
            }
        }
    }
    return occurrences;
}

export function part2(input: string) {
    let occurrences = 0;
    // break down the input into a matrix of characters
    const matrix = input
        .split("\n")
        .map((line) => line.replaceAll(" ", "").split("").filter(Boolean))
        .filter(Boolean);

    for (
        let windowPositionX = 0;
        windowPositionX < matrix.length - 3 + 1;
        windowPositionX++
    ) {
        for (
            let windowPositionY = 0;
            windowPositionY < matrix[0].length - 3 + 1;
            windowPositionY++
        ) {
            const window = slice2d<string>(
                matrix,
                [windowPositionX, windowPositionY],
                [3, 3],
            );
            const diagonal1 = `${window[0][0]}${window[1][1]}${window[2][2]}`;
            const diagonal2 = `${window[0][2]}${window[1][1]}${window[2][0]}`;
            if ((diagonal1 === "MAS" || diagonal1 === "SAM") && (diagonal2 === "MAS" || diagonal2 === "SAM")) {
                occurrences++;
            }
        }
    }
    return occurrences;
}
