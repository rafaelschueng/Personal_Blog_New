import { ImageLookupItem } from "./types/ImageLookupItem.ts";
import { GetBlogConfiguration } from "site/scripts/Config.ts";
import { existsSync } from "deno/fs/mod.ts";

function LookupTablePath() {
  let lookupTablePath = GetBlogConfiguration("global")["files"]["ImageLookupTable"];
  if(!lookupTablePath) throw new Error(`The lookup table not exist or the blog configuration is wrong!`)
  lookupTablePath = lookupTablePath.replace('./', `${Deno.cwd()}/`)
  return lookupTablePath
}

function FailsafeLookupTable (path: string | URL) {
  let data: ImageLookupItem [];
  const exists = existsSync(path)
  if(!exists) throw new Error(`The file in path: ${path} not exists!`);
  const contents = Deno.readTextFileSync(path);
  const isValidFile = contents.includes('[]') || contents.length > 0
  if(isValidFile){ 
    data = JSON.parse(contents);
    return data;
  }
  return [];
}

// solve the problem of creation a object instead of array!
export function GetImageLookupTable(path?: string | URL): Array<ImageLookupItem> {
  try {
    const filepath = (path)? path : LookupTablePath();
    const fileExists = existsSync(filepath);
    if(!fileExists) {
      CreateImageLookupTable(filepath)
      console.log(`Creating a new lookup table in ${filepath}`)
    }
    const contents = FailsafeLookupTable(filepath)
    return contents;
  } catch (error) {
    console.error(new Error(error));
    throw new Error(error);
  }
}

export function CreateImageLookupTable(path?: string | URL) {
  try {
    const _path = path ?? LookupTablePath();
    const images: Array<ImageLookupItem> = [];
    Deno.writeTextFileSync(_path, JSON.stringify(images));
    return _path;
  } catch (error) {
    console.error(new Error(error));
    throw new Error(error)
  }
}


// update this function
function AppendImageLookupTable (images: Array<ImageLookupItem>, newImage: ImageLookupItem) {
  const files:Array<ImageLookupItem> = GetImageLookupTable();
  const exists = files.some(file => file.md5 === newImage.md5)
  if(!exists) {
    files.push(newImage)
    return files
  }

  console.error(`The image: ${newImage.name} with checksum ${newImage.md5} exists in lookup table`)
  return files
}


// update this function
export function InsertImageOnLookupTable(newImage: ImageLookupItem) {
  try {
    const images:Array<ImageLookupItem> = GetImageLookupTable();
    const updated = AppendImageLookupTable(images, newImage);
    const lookupTablePath = LookupTablePath();
    Deno.writeTextFileSync(lookupTablePath, JSON.stringify(Array.from(updated)));
    return true
  } catch (error) {
    console.error(new Error(error));
    return false
  }
}
