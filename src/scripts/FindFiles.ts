function mustBeExcluded(path: string, excluded: string) {
  return !path.includes(excluded);
}

async function FindByPattern(pattern: string, path: string, excluded: string, results: Array<any>): Promise<any> {
  for await (const entry of Deno.readDir(path)) {
    const mustFollowPath = mustBeExcluded(path, excluded) && entry.isDirectory;
    if (mustFollowPath) await FindByPattern(pattern, `${path}/${entry.name}`, excluded, results);
    if (entry.name.includes(pattern)) {
      results.push({ path: new URL(`${path}/${entry.name}`), entry: entry});
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
