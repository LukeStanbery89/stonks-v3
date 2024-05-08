/* eslint-disable no-console */

/**
 * Logger class
 *
 * For now, this is just a wrapper around console.log, but it
 * could be expanded to include more functionality in the future.
 */
export default class Logger {
    public static log(...message: any[]): void {
        console.log(...message);
    }

    public static error(...message: any[]): void {
        console.error(...message);
    }

    public static warn(...message: any[]): void {
        console.warn(...message);
    }

    public static info(...message: any[]): void {
        console.info(...message);
    }
}
