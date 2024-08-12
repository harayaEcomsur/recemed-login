import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx','css'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/src/mocks/styleMock.ts",
    },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json', // Especifica que Jest debe usar este tsconfig
    },
  },
  testEnvironment: 'jsdom', // Asegúrate de utilizar el entorno jsdom
};

export default config;
