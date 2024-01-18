/**
 * Pauses the program for a given time in milliseconds.
 *
 * @param ms Time to sleep in milliseconds
 * @returns Promise<void>
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Rounds a number to a given number of decimal places.
 *
 * @param value Number to round
 * @param decimals Number of decimal places to round to
 * @returns number
 */
function round(value: number, decimals: number): number {
    return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}

export {
    sleep,
    round,
};
