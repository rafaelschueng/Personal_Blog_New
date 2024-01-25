export type ImageLookupItem = {
  name: string;
  path: string | URL;
  conversions: Array<string | URL>;
  md5: string;
};