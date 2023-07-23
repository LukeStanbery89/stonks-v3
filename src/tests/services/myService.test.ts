import { add, subtract } from "../../services/myService";

describe("MyService Tests", () => {
    test("add", () => {
        expect(add(1,2)).toBe(3);
    });

    test("subtract", () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test.todo("multply");

    test.todo("divide");
});
