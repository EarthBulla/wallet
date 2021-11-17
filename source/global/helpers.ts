import { keyable } from '~scripts/Background/types/IAssetsController';
import { Principal } from '@dfinity/principal';

export const shortenAddress = (address: string, startCut = 7, endCut = 4) => {
  return (
    address.substring(0, startCut) +
    '...' +
    address.substring(address.length - endCut, address.length)
  );
};

export const parseBigIntObj = (obj: keyable) =>
  JSON.parse(stringifyWithBigInt(obj));

export const stringifyWithBigInt = (obj: keyable) =>
  JSON.stringify(obj, (_, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );

/* 
GNU General Public License v3.0
https://github.com/Psychedelic/plug/blob/e4242a26f288556ee478ff9f4ac02d375d93c284/source/shared/utils/ids.js#L23

Modified version of parsePrincipalObj that deserializes serialized principal
*/

export const parsePrincipalObj = (data: keyable) => Object.entries(data).reduce((acum, [key, val]) => {
  const current: keyable = { ...acum };
  if (Array.isArray(val)) {
    current[key] = val.map((v) => parsePrincipalObj(v));
  } else if (val._isPrincipal) {
    current[key] = Principal.fromUint8Array(new Uint8Array(Object.values(val._arr)));
  } else if (typeof val === 'object') {
    current[key] = parsePrincipalObj(val);
  } else {
    current[key] = val;
  }
  return current;
}, {});