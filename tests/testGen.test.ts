import { sha256Hash, generateEmojiChecksum } from '../src/index';
import { validateAddress } from '../src/validateAddress';

describe('emoji-checksum package', () => {
  describe('sha256Hash', () => {
    it('should generate a valid SHA-256 hash for a given string', async () => {

      const input = 'test-hash';
      const expectedHash =
        'd6672ee3a93d0d6e3c30bdef89f310799c2f3ab781098a9792040d5541ce3ed3';

      const result = await sha256Hash(input);

      expect(result).toBe(expectedHash);
    });
  });

  describe('generateEmojiChecksum with validation', () => {
    it('should generate a checksum for a valid Ethereum address', async () => {
      const checksum = await generateEmojiChecksum(
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        4,
        'ETH'
      );
      expect(checksum.split(' ').length).toBe(4);
      expect(checksum).toBe("🥥 💿 🐌 ⚓")
    });

    it('should throw an error for an invalid Ethereum address', async () => {
      await expect(
        generateEmojiChecksum('invalid-address', 4, 'ETH')
      ).rejects.toThrow('Invalid ETH address');
    });

    it('should throw an error if network is missing and validation is enabled', async () => {
      await expect(
        generateEmojiChecksum('arbitrary-input', 4, undefined, true, false)
      ).rejects.toThrow('Network is required when validation is enabled.');
    });
  });

  describe('generateEmojiChecksum without validation', () => {
    it('should generate a checksum for arbitrary input without validation', async () => {
      const checksum = await generateEmojiChecksum(
        'arbitrary-input',
        6,         // Length = 6
        undefined, // No network needed
        true,      // Validation irrelevant
        true       // Skip validation
      );
      expect(checksum.split(' ').length).toBe(6);
    });
  });



  describe('Address Validation', () => {
    it('should validate Ethereum addresses correctly', () => {
      expect(validateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'ETH')).toBe(true);
      expect(validateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aa96045', 'ETH')).toBe(false); //invalid checksum
      expect(validateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aa96045', 'ETH', false)).toBe(true); //invalid checksum
      expect(validateAddress('invalid-eth-address', 'ETH')).toBe(false);
    });

    it('should validate Bitcoin addresses correctly', () => {
      expect(validateAddress('1BoatSLRHtKNngkdXEeobR76b53LETtpyT', 'BTC')).toBe(true);
      expect(validateAddress('invalid-btc-address', 'BTC')).toBe(false);
    });

    it('should validate Solana addresses correctly', () => {
      expect(validateAddress('4v1sJzGTVhu8N2G7JwVjqXYhn3Lh4AjdTZF7biMVePDB', 'SOL')).toBe(true);
      expect(validateAddress('invalid-sol-address', 'SOL')).toBe(false);
    });
  });
})
