module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  }
};
