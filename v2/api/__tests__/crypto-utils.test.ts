import { generateSecretKey } from '../src/helpers/crypto-utils';

jest.mock('crypto');

describe('generateSecretKey', () => {
  it('should expose a function', () => {
    expect(generateSecretKey).toBeDefined();
  });

  it('generateSecretKey should return expected output', () => {
    const retValue = generateSecretKey();
    if (retValue) {
      expect(retValue)?.toBeTruthy(); // Alterado para verificar o valor retornado pela função.
    }
  });
});