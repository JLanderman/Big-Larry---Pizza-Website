/**
 * Everything in this file is run before any of the tests are executed by jest
 */
import '@testing-library/jest-dom'
/**
 * jest runs tests using jsdom. jsdom does not support TextEncoder
 * or TextDecoder, so they need to be imported into the tests.
 */
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder; 
global.TextDecoder = TextDecoder;
