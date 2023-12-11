import { createHash } from 'crypto';

/**
 * Gera uma chave secreta usando valores aleatórios e criptografia SHA-256.
 * @returns {string} - Chave secreta gerada.
 */
export function generateSecretKey(): string {
    // Concatenação de dois números aleatórios convertidos para base 36
    const randomBytes = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Criação de um hash SHA-256 usando os bytes aleatórios
    const secretKey = createHash('sha256').update(randomBytes).digest('hex');

    return secretKey;
}