# Cronos EVM Client

The Cronos EVM Client is a TypeScript/JavaScript library designed to facilitate easy and efficient interactions with the Cronos Ethereum Virtual Machine (EVM). This client library provides methods to interact with CRC20 and CRC721 tokens, allowing developers to fetch balances, token metadata, and perform other contract interactions seamlessly.

![npm](https://img.shields.io/npm/v/@rarcifa/cronos-evm-client)

## Features

Simple and intuitive API for interacting with the Cronos blockchain.
Supports both CRC20 and CRC721 token standards.
Configurable client instances tailored to your specific blockchain endpoint and security needs.

## Installation

To install the package, run the following command in your project directory:

```bash
npm install cronos-evm-client
```

## Usage

Here’s how you can use the Cronos EVM Client in your project:

### Configuring the Client

```ts
import { createClient } from 'cronos-evm-client';

const client = createClient({
  endpoint: 'CRONOS_RPC_ENDPOINT',
  apiKey: 'OPPTIONAL_API_KEY', // optional
});
```

### Fetching CRC20 Token Balance```

```ts
const data = {
  method: 'eth_call',
  params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'],
};

client.crc20
  .getBalance(data)
  .then((balance) => {
    console.log('Token Balance:', balance);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Interacting with CRC721 Tokens

```ts
const tokenIdData = {
  method: 'eth_call',
  params: [{ to: '0xNftContractAddress', data: '0x...' }, 'latest'],
};

client.crc721
  .getOwnerOf(tokenIdData)
  .then((owner) => {
    console.log('NFT Owner Address:', owner);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

## API

### CRC20 Methods

- getBalance(data)
- getBalanceOf(data)
- getName(data)
- getSymbol(data)
- getTotalSupply(data)

### CRC721 Methods

- getBalanceOf(data)
- getOwnerOf(data)
- getTokenUri(data)

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.

## Contact

If you have any questions or comments about the library, please feel free to open an issue or a pull request on our GitHub repository.
