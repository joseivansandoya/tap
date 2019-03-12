import { getServerData, mapValueToName } from '../cli/utils';
import fetch from 'node-fetch';
import * as data from '../server/data.json';

jest.mock('node-fetch');

describe('CLI: utils functions', () => {
  // mock value that fetch must resolve
  fetch.mockResolvedValue({
    json: () => data
  });

  test('getServerData resolves properly', async () => {
    const result = await getServerData();
    const resultKeys = Object.keys(result);
    expect(resultKeys.length).toBeGreaterThanOrEqual(0);
  });

  test('getServerData rejects properly', async () => {
    // mock fetch response to a rejectable value
    fetch.mockReturnValue(undefined);
    const errorMessage = `Cannot read property 'json' of undefined`;
    const err = new TypeError(errorMessage);
    await expect(getServerData()).rejects.toEqual(err);
  });

  test('mapValueToName works properly', () => {
    const section = 'header';
    const value = 1;
    const expected = 'Title H1';
    expect(mapValueToName(section, value)).toBe(expected);
  })
});
