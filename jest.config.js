process.env.API_SECRET = 'API_SECRET';

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '\.mock\.ts$',
  ],
};
