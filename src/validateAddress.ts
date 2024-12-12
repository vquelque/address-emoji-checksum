import { isAddress as isValidETHAddress } from 'validate-ethereum-address';
import { validate as validateBTCAddress } from 'bitcoin-address-validation';
import { isAddress as isValidSOLAddress } from '@solana/addresses';

// Define supported networks
export type Network = 'ETH' | 'BTC' | 'SOL';

/**
 * Validate Ethereum address.
 * @param address - The Ethereum address.
 * @param validateChecksum - Whether to validate the checksum.
 * @returns Whether the address is valid.
 */
export const validateEthereum = (
  address: string,
  validateChecksum: boolean = true
): boolean => {
  if (!isValidETHAddress(address, false)) {
    return false; // Invalid Ethereum address
  }
  if (validateChecksum && !isValidETHAddress(address, true)) {
    return false; // Invalid checksum
  }
  return true;
};

/**
 * Validate Bitcoin address.
 * @param address - The Bitcoin address.
 * @returns Whether the address is valid.
 */
export const validateBitcoin = (address: string): boolean => {
  return validateBTCAddress(address);
};

/**
 * Validate Solana address.
 * @param address - The Solana address.
 * @returns Whether the address is valid.
 */
export const validateSolana = (address: string): boolean => {
  return isValidSOLAddress(address);
};

/**
 * Validate an address based on the selected network.
 * @param address - The address to validate.
 * @param network - The selected supported network
 * @param validateChecksum - Whether to validate the checksum (ETH only).
 * @returns Whether the address is valid.
 */
export const validateAddress = (
  address: string,
  network: Network,
  validateChecksum: boolean = true
): boolean => {
  switch (network) {
    case 'ETH':
      return validateEthereum(address, validateChecksum);
    case 'BTC':
      return validateBitcoin(address);
    case 'SOL':
      return validateSolana(address);
    default:
      throw new Error(`Unsupported network: ${network}`);
  }
};
