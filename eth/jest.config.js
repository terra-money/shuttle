module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
};
