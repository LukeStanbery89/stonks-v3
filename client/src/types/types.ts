interface TestAppState {
    value: number;
}

interface RootState {
    test: TestAppState;
}

export type { TestAppState, RootState };
