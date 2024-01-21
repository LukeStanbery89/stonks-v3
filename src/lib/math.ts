import { PriceData } from "../types/types";

/**
 * Calculates the sample mean of a set of price data.
 * @param bars Price data
 * @returns number
 */
export function calculateSampleMean(bars: PriceData[]): number {
    return bars.reduce((sum, bar) => sum + bar.close, 0) / bars.length;
}

/**
 * Calculate the slope of the trendline. Formula taken from:
 *
 * https://classroom.synonym.com/calculate-trendline-2709.html#consider-this-data-set-of-three
 *
 * @param bars
 * @returns number
 */
export function calculateSlope(bars: PriceData[]): number {
    const n = bars.length;
    const a = n * bars.reduce((sum, bar, i) => sum + ((i+1) * bar.close), 0);
    const sumOfXIndices = n * (n + 1) / 2;
    const sumOfYValues = bars.reduce((sum, bar) => sum + bar.close, 0);
    const b = sumOfXIndices * sumOfYValues;
    const c = n * bars.reduce((sum, bar, i) => sum + Math.pow((i+1), 2), 0);
    const d = Math.pow(sumOfXIndices, 2);
    return (a - b) / (c - d);
}

/**
 * Calculates the standard deviation of a set of price data.
 *
 * @param bars Price data
 * @param sampleMean Sample mean
 * @returns { stdDev: number; sumOfSquares: number; sampleVariance: number; upperBand: number; lowerBand: number; }
 */
export function calculateStdDev(bars: PriceData[], sampleMean: number): { stdDev: number; sumOfSquares: number; sampleVariance: number; upperBand: number; lowerBand: number; } {
    const sumOfSquares: number = bars.reduce((sum, bar) => sum + Math.pow(bar.close - sampleMean, 2), 0);
    const sampleVariance: number = sumOfSquares / (bars.length - 1); // Sample variance, so divide by n - 1
    const stdDev: number = Math.sqrt(sampleVariance);

    // Calculate the upper and lower bands of the standard deviation
    const { upperBand, lowerBand } = calculateStdDevBounds(sampleMean, stdDev);

    return {
        stdDev,
        sumOfSquares,
        sampleVariance,
        upperBand,
        lowerBand,
    };
}

/**
 * Calculates the upper and lower bounds of a standard deviation.
 *
 * @param sampleMean Sample mean
 * @param stdDev Standard deviation
 * @returns { upperBand: number; lowerBand: number; }
 */
export function calculateStdDevBounds(sampleMean: number, stdDev: number): { upperBand: number; lowerBand: number; } {
    const upperBand: number = sampleMean + (stdDev / 2);
    const lowerBand: number = sampleMean - (stdDev / 2);
    return { upperBand, lowerBand };
}

/**
 * Rounds a number to a given number of decimal places.
 *
 * @param value Number to round
 * @param decimals Number of decimal places to round to
 * @returns number
 */
export function round(value: number, decimals: number): number {
    return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
}
