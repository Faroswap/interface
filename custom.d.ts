/**
 * @see node_modules/next/image-types/global.d.ts
 */
declare module "*.svg?url" {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;

  export default content;
}
