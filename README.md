# Address Emoji Checksum

The **Emoji Checksum Package** provides tools for validating blockchain addresses (Ethereum, Bitcoin, Solana) and generating unique emoji-based checksums for addresses or arbitrary strings. This package is perfect for creating visually distinct representations of blockchain addresses.

[![npm version](https://badge.fury.io/js/address-emoji-checksum.svg)](https://badge.fury.io/js/address-emoji-checksum)
---

## Features
- **Address Validation**:
  - Supports Ethereum (with optional checksum validation).
  - Supports Bitcoin.
  - Supports Solana.

- **Emoji Checksum Generation**:
  - Configurable emoji checksum length.
  - Works with or without address validation.
  - Includes 325 curated unique emojis for creating checksums.

- **Validation Flexibility**:
  - Option to skip address validation for generating emoji checksums for arbitrary strings.

---

## Installation

Install the package via npm:

```bash
npm install address-emoji-checksum
```

---

## Usage

### Import the Functions

```typescript
import { generateEmojiChecksum, validateAddress } from 'address-emoji-checksum';
```

### Generate Emoji Checksum


```typescript
const checksum = await generateEmojiChecksum(
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  'ETH',
  4, // Optional length of checksum
  true // Enable checksum validation
);

console.log(checksum); // Outputs: 🥥 💿 🐌 ⚓
```


### Address Validation

You can validate addresses separately if needed:

```typescript
import { validateAddress } from 'address-emoji-checksum';

const isValidETH = validateAddress('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'ETH', true);
console.log(isValidETH); // true

const isValidBTC = validateAddress('bc1qjasf9z3h7w3jspkhtgatgpyvvzgpa2wwd2lr0eh5tx44reyn2k7sfc27a4', 'BTC');
console.log(isValidBTC); // true

const isValidSOL = validateAddress('4v1sJzGTVhu8N2G7JwVjqXYhn3Lh4AjdTZF7biMVePDB', 'SOL');
console.log(isValidSOL); // true
```

---

## Examples

### Generate Checksums for Various Networks
```typescript
const ethChecksum = await generateEmojiChecksum('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', 'ETH');
console.log(ethChecksum); // Outputs: 🥥 💿 🐌 ⚓

const btcChecksum = await generateEmojiChecksum('bc1qjasf9z3h7w3jspkhtgatgpyvvzgpa2wwd2lr0eh5tx44reyn2k7sfc27a4', 'BTC');
console.log(btcChecksum); // Outputs: 🕌 🍋 👻 🚢

const solChecksum = await generateEmojiChecksum('4v1sJzGTVhu8N2G7JwVjqXYhn3Lh4AjdTZF7biMVePDB', 'SOL');
console.log(solChecksum); // Outputs: 🍷 🥨 🧙 🌧️
```

---

## License
This package is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contributing
Contributions are welcome! Feel free to submit issues or pull requests for improvements and new features.
