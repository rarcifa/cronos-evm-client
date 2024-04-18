// src/cronosClient.ts

import { crc20 } from '#src/integrations/crc20.js';
import { crc721 } from '#src/integrations/crc721.js';
import axios, { AxiosInstance } from 'axios';

import { JsonRpcRequestPayload } from '#src/lib/interfaces/jsonRpcRequest .js';

/**
 * Configuration parameters for creating a blockchain client instance.
 *
 * @interface
 * @property {string} endpoint - The base URL for the RPC server.
 * @property {string} [apiKey] - Optional API key for accessing the RPC server if required.
 */
interface ClientConfig {
  endpoint: string;
  apiKey?: string;
}

/**
 * Interface for interacting with CRC20 token methods.
 *
 * @interface
 * @property {Function} getBalance - Fetches the balance of the main token.
 * @property {Function} getBalanceOf - Fetches the balance of a specified CRC20 token.
 * @property {Function} getName - Fetches the name of the CRC20 token.
 * @property {Function} getSymbol - Fetches the symbol of the CRC20 token.
 * @property {Function} getTotalSupply - Fetches the total supply of the CRC20 token.
 */
interface CRC20 {
  getBalance: (data: JsonRpcRequestPayload) => Promise<string>;
  getBalanceOf: (data: JsonRpcRequestPayload) => Promise<string>;
  getName: (data: JsonRpcRequestPayload) => Promise<string>;
  getSymbol: (data: JsonRpcRequestPayload) => Promise<string>;
  getTotalSupply: (data: JsonRpcRequestPayload) => Promise<string>;
}

/**
 * Interface for interacting with CRC721 token methods.
 *
 * @interface
 * @property {Function} getBalanceOf - Fetches the balance of a specified CRC721 token.
 * @property {Function} getOwnerOf - Fetches the owner address of a specific CRC721 token.
 * @property {Function} getTokenUri - Fetches the URI pointing to the metadata of the CRC721 token.
 */
interface CRC721 {
  getBalanceOf: (data: JsonRpcRequestPayload) => Promise<string>;
  getOwnerOf: (data: JsonRpcRequestPayload) => Promise<string>;
  getTokenUri: (data: JsonRpcRequestPayload) => Promise<string>;
}

/**
 * Defines the structure for a blockchain client that holds methods for interacting with both CRC20 and CRC721 tokens.
 *
 * @interface
 * @property {CRC20} crc20 - Methods for interacting with CRC20 tokens.
 * @property {CRC721} crc721 - Methods for interacting with CRC721 tokens.
 */
interface BlockchainClient {
  crc20: CRC20;
  crc721: CRC721;
}

/**
 * Creates a new client for interacting with the CRC20 contract over the Cronos blockchain.
 *
 * @param {ClientConfig} config - The configuration for setting up the client.
 * @returns {Object} Returns an object with methods to interact with the blockchain.
 *
 * @example
 * const cronosClient = createClient({
 *   endpoint: 'https://your-cronos-rpc-endpoint.com',
 *   apiKey: 'YOUR_API_KEY'
 * });
 */
export const createClient = ({
  endpoint,
  apiKey,
}: ClientConfig): BlockchainClient => {
  const instance: AxiosInstance = axios.create({
    baseURL: endpoint,
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
  });

  return {
    crc20: {
      /**
       * Fetches the balance of an account.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the balance.
       * @returns {Promise<string>} A promise that resolves to the main token balance of the account in Ether.
       *
       * @example
       * const data = { method: 'eth_getBalance', params: ['0x...', 'latest'] };
       * cronosClient.crc20.getBalance(data).then(balance => console.log(balance));
       */
      getBalance: (data: JsonRpcRequestPayload): Promise<string> =>
        crc20.getBalance(data, instance),

      /**
       * Fetches the token balance of an account for a specified CRC20 contract.
       * @param {JsonRpcRequestPayload} data - The payload to query the token balance.
       * @returns {Promise<string>} A promise that resolves to the CRC20 token balance of the account in Ether.
       * @example
       * const data = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * cronosClient.crc20.getBalanceOf(data).then(balance => console.log(balance));
       */
      getBalanceOf: (data: JsonRpcRequestPayload): Promise<string> =>
        crc20.getBalanceOf(data, instance),

      /**
       * Fetches the name of a CRC20 token.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the name of the token.
       * @returns {Promise<string>} A promise that resolves to the name of the CRC20 token.
       *
       * @example
       * const data = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * cronosClient.crc20.getName(data).then(name => console.log(name));
       */
      getName: (data: JsonRpcRequestPayload): Promise<string> =>
        crc20.getName(data, instance),

      /**
       * Fetches the symbol of a CRC20 token.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the symbol of the token.
       * @returns {Promise<string>} A promise that resolves to the symbol of the CRC20 token.
       *
       * @example
       * const data = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * cronosClient.crc20.getSymbol(data).then(symbol => console.log(symbol));
       */
      getSymbol: (data: JsonRpcRequestPayload): Promise<string> =>
        crc20.getSymbol(data, instance),

      /**
       * Fetches the total supply of a CRC20 token.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the total supply of the token.
       * @returns {Promise<string>} A promise that resolves to the total supply of the CRC20 token.
       *
       * @example
       * const data = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * cronosClient.crc20.getTotalSupply(data).then(supply => console.log(supply));
       */
      getTotalSupply: (data: JsonRpcRequestPayload): Promise<string> =>
        crc20.getTotalSupply(data, instance),
    },
    crc721: {
      /**
       * Fetches the token balance of an account for a specified ERC721 contract.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the balance of a crc721 token.
       * @returns {Promise<string>} A promise that resolves to the crc721 token balance of the account.
       *
       * @example
       * const payload = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * crc721.getBalanceOf(payload).then(balance => console.log(balance));
       */
      getBalanceOf: (data: JsonRpcRequestPayload): Promise<string> =>
        crc721.getBalanceOf(data, instance),

      /**
       * Fetches the owner address of a specific ERC721 token from a specified contract.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the owner address of a specific crc721 token.
       * @returns {Promise<string>} The owner address of the specified crc721 token.
       *
       * @example
       * const payload = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * crc721.getOwnerOf(payload).then(owner => console.log(owner));
       */
      getOwnerOf: async (data: JsonRpcRequestPayload): Promise<string> =>
        crc721.getOwnerOf(data, instance),

      /**
       * Fetches the URI (often a URL) that points to the metadata of the specified ERC721 token.
       *
       * @param {JsonRpcRequestPayload} data - The payload to query the URI of a crc721 token.
       * @returns {Promise<string>} The URI of the specified crc721 token.
       *
       * @example
       * const payload = { method: 'eth_call', params: [{ to: '0xContractAddress', data: '0x...' }, 'latest'] };
       * crc721.getTokenUri(payload).then(uri => console.log(uri));
       */
      getTokenUri: async (data: JsonRpcRequestPayload): Promise<string> =>
        crc721.getTokenUri(data, instance),
    },
  };
};
