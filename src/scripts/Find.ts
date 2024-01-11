import { ImageTypes } from "site/scripts/MimeTypes.ts";

export type Entries = Deno.DirEntry & { path: URL };

export async function WalkBetweenDirectoriesAsync(workspace: string | URL = Deno.cwd()): Promise<Array<Entries>> {
  const result: Array<Entries> = [];
  const wanderer = async (workspace: string | URL, result: Array<Entries>) => {
    for await (const entry of Deno.readDir(workspace)) {
      if (entry.isFile) result.push({ ...entry, path: new URL(`file://${workspace}\\${entry.name}`) });
      const mustEnter = entry.isDirectory && !entry.name.startsWith(`.`);
      if (mustEnter) {
        result.push({ ...entry, path: new URL(`file://${workspace}\\${entry.name}`) });
        await wanderer(`${workspace}\\${entry.name}`, result);
      }
    }
  };
  const _workspace = (workspace as URL)?.pathname ?? workspace
  await wanderer(workspace, result);
  return result;
}

export function WalkBetweenDirectoriesSync(workspace: string = Deno.cwd()): Array<Entries> {
  const result: Array<Entries> = [];
  const wanderer = (workspace: string, result: Array<Entries>) => {
    for (const entry of Deno.readDirSync(workspace)) {
      const mustSave = entry.isFile && !entry.name.startsWith(`.`);
      if (mustSave) result.push({ ...entry, path: new URL(`file://${workspace}\\${entry.name}`) });
      const mustEnter = entry.isDirectory && !entry.name.startsWith(`.`);
      if (mustEnter) {
        result.push({ ...entry, path: new URL(`file://${workspace}\\${entry.name}`) });
        wanderer(`${workspace}\\${entry.name}`, result);
      }
    }
  };
  wanderer(workspace, result);
  return result;
}

function mustBeExcluded(path: string, excluded: string) {
  return !path.includes(excluded);
}

async function FindByPattern(pattern: string, path: string, excluded: string, results: Array<any>): Promise<any> {
  for await (const entry of Deno.readDir(path)) {
    const mustFollowPath = mustBeExcluded(path, excluded) && entry.isDirectory;
    if (mustFollowPath) await FindByPattern(pattern, `${path}/${entry.name}`, excluded, results);
    if (entry.name.includes(pattern)) {
      results.push({ path: new URL(`${path}/${entry.name}`), entry: entry });
    }
  }
}

export async function FindByMimeType(mimetype: string, path: string, excluded: string) {
  const result: Array<any> = [];
  if (!mimetype.length) throw new Error("Mimetype is null or empty!");
  if (mimetype.startsWith(".")) await FindByPattern(mimetype, path, excluded, result);
  return result;
}

//TODO: add check if target must be a file or directory
export async function FindByName(name: string, path: string, excluded: string) {
  const results: Array<any> = [];
  if (!name.length) throw new Error("Name is null or empty");
  await FindByPattern(name, path, excluded, results);
  return results;
}

function FilterPerImageMimeType (paths: Array<any>): Array<Entries> {
  let types = ImageTypes()

  const data:Array<Entries> = [];
  paths.forEach(file => {
    types.forEach(type => {
      const isImage = file.path.toString().endsWith(type);
      if(isImage) data.push(file)
    })
  })

  return data;
}

export async function FindAllImages(workspace:string | URL = Deno.cwd()) {
  let files: Array<Entries> = await WalkBetweenDirectoriesAsync(workspace);
  files = files.filter((file) => file.isFile && !file.path.toString().includes("build"));
  const images = FilterPerImageMimeType(files);
  return images;
}

export async function FindImages(workspace: string) {
  let files = await WalkBetweenDirectoriesAsync(workspace);
  files = files.filter((file) => file.isFile && !file.path.toString().includes("build"));
  const images = FilterPerImageMimeType(files);
  return images;
}
