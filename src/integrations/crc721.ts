import { format } from '#src/helpers/formatting.js';
import { logger } from '#src/helpers/logger.js';
import { AxiosInstance, AxiosResponse } from 'axios';

import { JsonRpcRequestPayload } from '#src/lib/interfaces/jsonRpcRequest .js';
import {
  JsonRpcError,
  JsonRpcResponse,
} from '#src/lib/interfaces/jsonRpcResponse.js';

/**
 * CRC721 integration for managing Ethereum RPC requests.
 *
 * @fileoverview This file provides helper functions for Ethereum JSON-RPC interactions.
 * @namespace crc721
 */
export const crc721 = {
  /**
   * Fetches the token balance of an account for a specified contract.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the balance of a crc721 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc721 instance
   * @returns {Promise<string>} The crc721 token balance of the account.
   *
   * @example
   * const data = crc721.getBalanceOf(payload);
   */
  getBalanceOf: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc721/getBalanceOf] error:', responseError.message);
        throw new Error(
          `[crc721/getBalanceOf] error: ${responseError.message}`
        );
      }

      const result: string = format.formatTokenAmount(response.data.result, 0);
      return result;
    } catch (e) {
      logger.error('[crc721/getBalanceOf] error:', e);
      throw e;
    }
  },

  /**
   * Fetches the owner address for a specified contract.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the owner address of a crc721 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc721 instance
   * @returns {Promise<string>} The owner address of the crc721 token.
   *
   * @example
   * const data = crc721.getOwnerOf(payload);
   */

  getOwnerOf: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc721/getOwnerOf] error:', responseError.message);
        throw new Error(`[crc721/getOwnerOf] error: ${responseError.message}`);
      }

      const result: string = response.data.result;
      return result;
    } catch (e) {
      logger.error('[crc721/getOwnerOf] error:', e);
      throw e;
    }
  },

  /**
   * Fetches the uri for a specified contract.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the uri of a crc721 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc721 instance
   * @returns {Promise<string>} The uri of the crc721 token.
   *
   * @example
   * const data = crc721.getTokenUri(payload);
   */

  getTokenUri: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc721/getBalanceOf] error:', responseError.message);
        throw new Error(
          `[crc721/getBalanceOf] error: ${responseError.message}`
        );
      }

      const result: string = format.decodeHexString(response.data.result);
      return result;
    } catch (e) {
      logger.error('[crc721/getBalanceOf] error:', e);
      throw e;
    }
  },
};
