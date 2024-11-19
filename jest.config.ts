import type { Config } from 'jest';

const config: Config = {
  moduleDirectories: ['node_modules'],
  transform: {
    '^.+\\.ts$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
            dynamicImport: true,
          },
          transform: {
            decoratorMetadata: true,
          },
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  testRegex: '/(__tests__|test)/.*\\.(spec|test).[jt]sx?',
};

export default config;