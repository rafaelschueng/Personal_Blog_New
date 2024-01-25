import { existsSync } from "deno/fs/exists.ts";
import { crypto } from "deno/crypto/mod.ts";
import { ImageLookupItem } from "site/scripts/types/ImageLookupItem.ts";
import { encodeHex } from "deno/encoding/hex.ts";

const StartsWithPoint = (path: string) => path.startsWith(".");
const StartsWithSlash = (path: string) => path.startsWith("/");
const StartsWithSlashPoint = (path: string) => path.startsWith("./");
const AnyPointOrSlash = (path: string) => StartsWithPoint(path) || StartsWithSlash(path) || StartsWithSlashPoint(path);

export function IsPointSlashDirectory(directory: string | URL) {
  if (directory instanceof URL) {
    const _directory = directory.pathname;
    if (AnyPointOrSlash(_directory)) return true;
    return false;
  }
  if (typeof directory === "string") {
    const _directory = directory as string;
    if (AnyPointOrSlash(_directory)) return true;
    return false;
  }
}

export const AddSlash = (directory: string) => StartsWithSlash(directory) ? directory : `/${directory}`;
export const AddPoint = (directory: string) => StartsWithPoint(directory) ? directory : `.${directory}`;
export const SanitizeNonWord = (element: string, replacement: string) => element.replace(/\W*|\s/g, replacement);

export function AddPointSlash(directory: string | URL) {
  if (directory instanceof URL) {
    let _directory = SanitizeNonWord(directory.pathname, " ");
    _directory = AddSlash(_directory);
    _directory = AddPoint(_directory);
    return _directory;
  }
  let _directory = SanitizeNonWord(directory, "");
  _directory = AddSlash(_directory);
  _directory = AddPoint(_directory);
  return _directory;
}

export function MakeDirectory(workspace: string | URL, path: string | URL) {
  const _workspace = (workspace as URL)?.pathname ?? workspace;
  const _path = (path as URL)?.pathname ?? path;
  const _newDirectory = AppendDirectories(_workspace, _path);
  if (!existsSync(_newDirectory)) {
    console.log(`Creating a new directory: ${_newDirectory}!`);
    Deno.mkdirSync(_newDirectory);
    return _newDirectory;
  }
  console.error(new Error(`The directory: ${_newDirectory} already exists!`));
  return _newDirectory;
}

export function FilenameFromPath (path:string | URL) {
  const _filename = (path as URL)?.pathname;
}

export function BasePath(directory: string | URL) {
  let path = "";
  if (directory instanceof URL) path = directory?.pathname;
  if (typeof directory === "string") path = directory as string;

  const endsWithMimetype = /\.\w{3,5}/g;

  if (!endsWithMimetype.test(path)) throw new Error(`The ${path} is not a file!`);

  return path
    .split("/")
    .filter((word, index, array) => (word && (index !== array.length - 1)) ? word : false)
    .join("/");
}

export function AppendDirectories(path: string | URL, toBeAppended: string | Array<string>) {
  if (path instanceof URL) {
    let _path: string | Array<string> = path.pathname;
    _path = _path.split("/");
    if (typeof toBeAppended === "string") _path.push(toBeAppended);
    if (Array.isArray(toBeAppended)) _path.push(...toBeAppended);
    return new URL(`file:///${_path.join("/")}/`);
  }

  let _path = path.split("/");
  if (typeof toBeAppended === "string") _path.push(toBeAppended);
  if (Array.isArray(toBeAppended)) _path.push(...toBeAppended);
  return _path.join('/').concat('/');
}


export async function CreateHashFromFile (path: string | URL) {
  const file = await Deno.open(path, {read: true})
  const stream = file.readable;
  const digest = await crypto.subtle.digest('MD5', stream)
  return encodeHex(digest);
}

export function CreateHashFromString (data: string) {
  const buffer = crypto.subtle.digestSync('MD5', new TextEncoder().encode(data));
  const charsIntArray = Array.from(new Uint8Array(buffer));
  return charsIntArray.map(char => char.toString(16).padStart(2, "0")).join('')
}

export function ObjectToString (object: Object) {
  return JSON.stringify(object);
}

export function ObjectWanderer (object: any) {
  const isObject = typeof object === 'object' && object?.constructor?.name === 'Object'
  if (!isObject) throw new Error('The argument is not a object!');

  let result: string = ''
  const keys = Object.keys(object);

  const wanderer = (object: any) => {
    for (const key of Object.keys(object)) {
      const value = object[key as keyof object]
      const isArray = Array.isArray(value)
      if(isArray){
        result = (value.length)? result + `${key}:[${value.toString()}],`: result + `${key}:[],`;
      }
      const isObject = typeof value === 'object' && value?.constructor?.name === 'Object'
      if(isObject){
        result = result + `${key}:{` 
        wanderer(value)
        result = result + '},'
      }
      if (!isObject && !isArray) {
        result = result + `${key}:${value},`
      }
    }
  }

  wanderer(object);
  result = `{${result}}`
  result = result.replaceAll(',}', "}")
  return result
}
