/**
 * truncate pool address: 0xeBa959390016dd81419A189e5ef6F3B6720e5A90 => 0xeBa9...5A90
 * @param address pool address
 */
export function truncatePoolAddress(address: string): string {
  if (address.length <= 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export default function isZeroAddress(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString);
}
