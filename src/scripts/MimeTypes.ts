import { MimeType } from "./types/MimeType.ts";

function FetchMimetypes(): Array<MimeType> {
  const file = Deno.readTextFileSync(`${Deno.cwd()}/src/scripts/MimeTypes.json`);
  return JSON.parse(file);
}

export function MimeTypes(): Array<MimeType> {
  return FetchMimetypes();
}

export function ImageMimeTypes(): Array<MimeType> {
  const mimetypes = FetchMimetypes();
  return mimetypes.filter((mimetype) => mimetype.name.startsWith("image"));
}

export function ImageTypes(): Array<string> {
  let mimetypes: Array<MimeType> | Array<string> = FetchMimetypes();

  mimetypes = mimetypes
    .filter((mimetype) => mimetype.name.startsWith("image"))
    .map((mimetype) => mimetype.types).flat();

  return Array.from(new Set(mimetypes));
}
