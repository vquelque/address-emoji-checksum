import { getEmoji, NUM_EMOJIS } from "./allEmojis";
import { validateAddress, Network } from "./validateAddress";

/**
 * Compute a SHA-256 hash of a string.
 * @param message - The input string to hash.
 * @returns The SHA-256 hash as a hexadecimal string.
 */
export const sha256Hash = async (message: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

/**
 * Generate an emoji checksum from an address.
 * @param address - The input address.
 * @param length - The length of the emoji checksum.
 * @param network - Supported network of the address to validate.
 * @param validateChecksum - Whether to validate the checksum (ETH only).
 * @param skipValidation - If true, skips address validation entirely.
 * @returns The emoji checksum.
 */
export const generateEmojiChecksum = async (
  address: string,
  length: number = 4,
  network?: Network,
  validateChecksum: boolean = true,
  skipValidation: boolean = false,
): Promise<string> => {
  if (!skipValidation) {
    if (!network) {
      throw new Error("Network is required when validation is enabled.");
    }
    if (!validateAddress(address, network, validateChecksum)) {
      throw new Error(`Invalid ${network} address`);
    }
  }

  // Generate emoji checksum
  const hash = await sha256Hash(address.toLowerCase());
  const emojis = [...Array(length)].map((_, i) => {
    const segment = hash.slice(
      i * (hash.length / length),
      (i + 1) * (hash.length / length),
    );
    const idx = Number(BigInt(`0x${segment}`) % BigInt(NUM_EMOJIS));
    return getEmoji(idx);
  });

  return emojis.join(" ");
};
