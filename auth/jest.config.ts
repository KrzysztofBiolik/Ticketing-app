/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    testPathIgnorePatterns: ['/node_modules/'],
    modulePaths: ["<rootdir>/src"],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
  };