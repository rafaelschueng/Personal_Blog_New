import { existsSync } from "deno/fs/exists.ts";
import { crypto } from "deno/crypto/mod.ts";
import { encodeHex } from "deno/encoding/hex.ts";

export function FixPathSlashes(path: URL) {
  let _path = path.href;
  _path = _path.replaceAll(/\/{1,5}|\\{1,5}/g, "/");
  return new URL(`${path.protocol}:${_path}`);
}

export function MakeDirectory(path: URL) {
  const _path = path;
  if (!existsSync(_path)) {
    console.log(`Creating a new directory: ${_path}!`);
    Deno.mkdirSync(_path, {recursive: true});
    return _path;
  }
  console.error(new Error(`The directory: ${_path} already exists!`));
  return _path;
}

export function FilenameFromPath(path: string | URL) {
  const _filename = (path as URL)?.pathname;
}

export function BasePath(directory: URL) {

  const path = directory.href;
  const endsWithMimetype = /\.\w{3,5}/g;
  if (!endsWithMimetype.test(path)) throw new Error(`The ${path} is not a file!`);

  const result = path
    .split("/")
    .filter((word, index, array) => (word && (index !== array.length - 1)) ? word : false)
    .join("/");

  return new URL(result);
}

export function AppendDirectories(path: URL, toBeAppended: URL) {
  const _path = FixPathSlashes(path);
  const _toBeAppended = FixPathSlashes(toBeAppended);
  const pathSplited = _path.href.split('/');
  const toBeAppendSplited = _toBeAppended.href.split('/');
  pathSplited.push(...toBeAppendSplited)
  const result = new Set(pathSplited)
  const joinedFilePath = Array.from(result).join('/')
  return new URL(`file:${joinedFilePath}`)
}

export async function CreateHashFromFile(path: URL) {
  const file = await Deno.open(path, { read: true });
  const stream = file.readable;
  const digest = await crypto.subtle.digest("MD5", stream);
  return encodeHex(digest);
}

export function CreateHashFromString(data: string) {
  const buffer = crypto.subtle.digestSync("MD5", new TextEncoder().encode(data));
  const charsIntArray = Array.from(new Uint8Array(buffer));
  return charsIntArray.map((char) => char.toString(16).padStart(2, "0")).join("");
}

export function ObjectToString(object: Object) {
  return JSON.stringify(object);
}

export function ObjectWanderer(object: any) {
  const isObject = typeof object === "object" && object?.constructor?.name === "Object";
  if (!isObject) throw new Error("The argument is not a object!");

  let result: string = "";
  const keys = Object.keys(object);

  const wanderer = (object: any) => {
    for (const key of Object.keys(object)) {
      const value = object[key as keyof object];
      const isArray = Array.isArray(value);
      if (isArray) {
        result = (value.length) ? result + `${key}:[${value.toString()}],` : result + `${key}:[],`;
      }
      const isObject = typeof value === "object" && value?.constructor?.name === "Object";
      if (isObject) {
        result = result + `${key}:{`;
        wanderer(value);
        result = result + "},";
      }
      if (!isObject && !isArray) {
        result = result + `${key}:${value},`;
      }
    }
  };

  wanderer(object);
  result = `{${result}}`;
  result = result.replaceAll(",}", "}");
  return result;
}

export function IsFileSystemURI (path: URL) {
  const containsProtocol = path.protocol.length > 0;
  const startsWithFileProtocol = path.protocol.startsWith('file:');
  if(!containsProtocol) throw new Error('Is not a filesystem URI!')
  if(!startsWithFileProtocol) throw new Error('Isnt file or contains a file protocol on URI!')
}

export function ExtractMimetype (file: URL): string {
  const _file = file.toString()
  const regex = /\.\w{3,5}$|\.\w{3,5}\/$/g;
  let result = _file.match(regex)?.[0] || ''
  result = result.split('.')[1]
  return result
}