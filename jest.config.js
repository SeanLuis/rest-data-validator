module.exports = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jest-environment-node',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,ts}'],
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      useESM: true
    }
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    "^rest-data-validator$": "<rootDir>/dist/index.js"
  },
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/dist/"
  ]
};
