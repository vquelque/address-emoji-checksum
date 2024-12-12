module.exports = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Set the test environment
  roots: ['<rootDir>/tests'], // Point Jest to the tests folder
  transform: {
    '^.+\\.ts$': 'ts-jest', // Use ts-jest for TypeScript files
  },
};
