import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usa ts-jest para transpilar TypeScript
  testEnvironment: 'node', // Define o ambiente de teste como Node.js
  clearMocks: true, // Limpa mocks automaticamente entre os testes
  collectCoverage: true, // Ativa a coleta de cobertura de código
  coverageDirectory: 'coverage', // Diretório onde será salva a cobertura
  moduleFileExtensions: ['js', 'ts'], // Extensões de arquivos para resolver
  roots: ['<rootDir>/src'], // Define onde estão os arquivos de teste
  testMatch: ['**/*.spec.ts'], // Busca arquivos de teste com `.spec.ts`
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1', // Suporte para caminhos absolutos
  },
};

export default config;
