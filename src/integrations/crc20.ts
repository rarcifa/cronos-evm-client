import { format } from '#src/helpers/formatting.js';
import { logger } from '#src/helpers/logger.js';
import { AxiosInstance, AxiosResponse } from 'axios';

import { JsonRpcRequestPayload } from '#src/lib/interfaces/jsonRpcRequest .js';
import {
  JsonRpcError,
  JsonRpcResponse,
} from '#src/lib/interfaces/jsonRpcResponse.js';

/**
 * CRC20 integration for managing Ethereum RPC requests.
 *
 * @fileoverview This file provides helper functions for Ethereum JSON-RPC interactions.
 * @namespace crc20
 */
export const crc20 = {
  /**
   * Fetches the balance of an account.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the balance of the main token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc20 instance
   * @returns {Promise<string>} The main token balance of the account.
   *
   * @example
   * const data = crc20.getBalance(payload);
   */
  getBalance: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc20/getBalance] error:', responseError.message);
        throw new Error(`[crc20/getBalance] error: ${responseError.message}`);
      }

      const result: string = format.weiToEther(response.data.result);
      return result;
    } catch (e) {
      logger.error('[crc20/getBalance] error:', e);
      throw e;
    }
  },

  /**
   * Fetches the token balance of an account for a specified contract.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the balance of a crc20 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc20 instance
   * @returns {Promise<string>} The crc20 token balance of the account.
   *
   * @example
   * const data = crc20.getBalanceOf(payload);
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
        logger.error('[crc20/getBalanceOf] error:', responseError.message);
        throw new Error(`[crc20/getBalanceOf] error: ${responseError.message}`);
      }

      const result: string = format.weiToEther(response.data.result);
      return result;
    } catch (e) {
      logger.error('[crc20/getBalanceOf] error:', e);
      throw e;
    }
  },

  /**
   * Fetches the name of the CRC20 token.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the name of a crc20 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc20 instance
   * @returns {Promise<string>} The name of the token.
   *
   * @example
   * const data = crc20.getName(payload);
   */
  getName: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc20/getName] error:', responseError.message);
        throw new Error(`[crc20/getName] error: ${responseError.message}`);
      }

      const result: string = format.decodeHexString(response.data.result);
      return result;
    } catch (e) {
      logger.error('[crc20/getName] error:', e);
      throw e;
    }
  },

  /**
   * Fetches the symbol of the CRC20 token.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the symbol of a crc20 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc20 instance
   * @returns {Promise<string>} The symbol of the token.
   *
   * @example
   * const data = crc20.getSymbol(payload);
   */
  getSymbol: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc20/getSymbol] error:', responseError.message);
        throw new Error(`[crc20/getSymbol] error: ${responseError.message}`);
      }

      const result: string = format.decodeHexString(response.data.result);
      return result;
    } catch (e) {
      logger.error('[crc20/getSymbol] error:', e);
      throw e;
    }
  },

  /**
   * Fetches the total supply of the CRC20 token.
   *
   * @param {JsonRpcRequestPayload} data - The payload to query the total supply of a crc20 token.
   * @param {AxiosInstance} cronosInstance - The cronos client to initialize the crc20 instance
   * @returns {Promise<string>} The total supply of the token.
   *
   * @example
   * const data = crc20.getTotalSupply(payload);
   */
  getTotalSupply: async (
    data: JsonRpcRequestPayload,
    cronosInstance: AxiosInstance
  ): Promise<string> => {
    try {
      const response: AxiosResponse<JsonRpcResponse<string>> =
        await cronosInstance.post<JsonRpcResponse<string>>('', data);
      const responseError: JsonRpcError = response.data.error;

      if (responseError) {
        logger.error('[crc20/getTotalSupply] error:', responseError.message);
        throw new Error(
          `[crc20/getTotalSupply] error: ${responseError.message}`
        );
      }

      const result: string = format.formatTokenAmount(response.data.result, 6);
      return result;
    } catch (e) {
      logger.error('[crc20/getTotalSupply] error:', e);
      throw e;
    }
  },
};
