export function validUri(uri: string) {
  if (!uri) return true;
  return (
    uri.startsWith('http:') ||
    uri.startsWith('https:') ||
    uri.startsWith('ipfs:') ||
    uri.endsWith('.eth')
  );
}
