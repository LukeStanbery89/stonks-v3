import { calculateSampleMean, calculateSlope, calculateStdDev, calculateStdDevBounds, round } from "../../lib/math";
import { PriceData } from "../../types/types";

describe("math", () => {
    describe("calculateSampleMean()", () => {
        it("should calculate the sample mean of a set of price data", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 5, volume: 0 },
            ];

            expect(calculateSampleMean(bars)).toEqual(3);
        });

        it("should calculate the sample mean of a set of price data with decimals", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1.1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2.2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3.3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4.4, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 5.5, volume: 0 },
            ];

            expect(calculateSampleMean(bars)).toEqual(3.3);
        });

        it("should calculate the sample mean of a set of price data with integers and decimals", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2.2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4.4, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 5, volume: 0 },
            ];

            expect(calculateSampleMean(bars)).toEqual(3.12);
        });
    });

    describe("calculateSlope()", () => {
        it("should calculate the slope of a positive trendline", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3, volume: 0 },
            ];

            expect(calculateSlope(bars)).toEqual(1);
        });

        it("should calculate the slope of a negative trendline", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
            ];

            expect(calculateSlope(bars)).toEqual(-1);
        });

        it("should calculate the slope of a flat trendline", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
            ];

            expect(calculateSlope(bars)).toEqual(0);
        });

        it("should calculate the slope of a trendline with decimals", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1.1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2.2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3.3, volume: 0 },
            ];

            expect(calculateSlope(bars)).toEqual(1.1000000000000003);
        });

        it("should calculate the slope of a trendline with integers and decimals", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2.5, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4, volume: 0 },
            ];

            expect(calculateSlope(bars)).toEqual(1.5);
        });
    });

    describe("calculateStdDev()", () => {
        it("should calculate the standard deviation of a set of price data", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 5, volume: 0 },
            ];

            const sampleMean: number = calculateSampleMean(bars);

            const { stdDev, sumOfSquares, sampleVariance, upperBand, lowerBand } = calculateStdDev(bars, sampleMean);

            expect(stdDev).toEqual(1.5811388300841898);
            expect(sumOfSquares).toEqual(10);
            expect(sampleVariance).toEqual(2.5);
            expect(upperBand).toEqual(3.790569415042095);
            expect(lowerBand).toEqual(2.209430584957905);
        });

        it("should calculate the standard deviation of a set of price data with decimals", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1.1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2.2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3.3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4.4, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 5.5, volume: 0 },
            ];

            const sampleMean: number = calculateSampleMean(bars);

            const { stdDev, sumOfSquares, sampleVariance, upperBand, lowerBand } = calculateStdDev(bars, sampleMean);

            expect(stdDev).toEqual(1.7392527130926085);
            expect(sumOfSquares).toEqual(12.1);
            expect(sampleVariance).toEqual(3.025);
            expect(upperBand).toEqual(4.1696263565463045);
            expect(lowerBand).toEqual(2.4303736434536956);
        });

        it("should calculate the standard deviation of a set of price data with integers and decimals", () => {
            const bars: PriceData[] = [
                { timestamp: "", open: 0, high: 0, low: 0, close: 1, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 2.2, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 3, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 4.4, volume: 0 },
                { timestamp: "", open: 0, high: 0, low: 0, close: 5, volume: 0 },
            ];

            const sampleMean: number = calculateSampleMean(bars);

            const { stdDev, sumOfSquares, sampleVariance, upperBand, lowerBand } = calculateStdDev(bars, sampleMean);

            expect(stdDev).toEqual(1.62234398325386);
            expect(sumOfSquares).toEqual(10.528000000000002);
            expect(sampleVariance).toEqual(2.6320000000000006);
            expect(upperBand).toEqual(3.93117199162693);
            expect(lowerBand).toEqual(2.3088280083730703);
        });
    });

    describe("calculateStdDevBounds()", () => {
        it("should calculate the upper and lower bounds of a standard deviation", () => {
            const sampleMean = 3.3;
            const stdDev = 1.5811388300841898;

            const { upperBand, lowerBand } = calculateStdDevBounds(sampleMean, stdDev);

            expect(upperBand).toEqual(4.090569415042094);
            expect(lowerBand).toEqual(2.509430584957905);
        });
    });

    describe("round()", () => {
        it("should round a number to the specified number of decimal places", () => {
            expect(round(1.2345, 0)).toEqual(1);
            expect(round(1.2345, 1)).toEqual(1.2);
            expect(round(1.2345, 2)).toEqual(1.23);
            expect(round(1.2345, 3)).toEqual(1.235);
            expect(round(1.2345, 4)).toEqual(1.2345);
            expect(round(1.2345, 5)).toEqual(1.2345);
            expect(round(1.23456789, 4)).toEqual(1.2346);
            expect(round(1.9999, 0)).toEqual(2);
        });
    });
});
