import type { Config } from 'jest';

import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths || {},
    { prefix: '<rootDir>/' },
  ),
  transform: {
    '^.+\.tsx?$': ['ts-jest', {}],
  },
};

export default config;
