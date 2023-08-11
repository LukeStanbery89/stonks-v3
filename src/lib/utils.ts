/**
 * Pauses the program for a given time in milliseconds.
 *
 * @param ms Time to sleep in milliseconds
 * @returns Promise
 */
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export {
    sleep,
};
