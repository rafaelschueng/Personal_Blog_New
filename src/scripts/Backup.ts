import { copySync } from "deno/fs/mod.ts";
import { BasePath, MakeDirectory, SanitizeNonWord } from "site/scripts/Utils.ts";
import { Entries } from "site/scripts/Find.ts";

export function PreserveFiles(files: Array<string> | Array<Entries>, folder: string) {
  let folders = files.map((image) => BasePath((image as Entries)?.path.pathname ?? image));
  folders = Array.from(new Set(folders));
  folders.map((path) => BackupFiles(path, folder));
}

/** Make a backup from file to an specific destiny*/
export function BackupFile(filePath: string, destiny: string) {
  const workspace = BasePath(filePath);
  MakeDirectory(workspace, destiny);
  copySync(filePath, destiny, { overwrite: true });
}

/** Makes a recursive backup
 * @param {URL | string} origin
 * @param {URL | string} destiny
 */
export function BackupFiles(origin: string | URL, destiny: string | URL) {
  const _workspace = (origin as URL)?.pathname ?? origin;
  let _destiny = (destiny as URL)?.pathname ?? destiny;
  _destiny = SanitizeNonWord(_destiny, ``);
  const copyDir = MakeDirectory(_workspace, _destiny);
  for (const entry of Deno.readDirSync(origin)) {
    const _file = `${_workspace}\/${entry.name}`;
    const _copy = `${copyDir}\/${entry.name}`;
    const _avoidSelfCopy = entry.name !== _destiny;
    if (_avoidSelfCopy) {
      console.log(`Copying file ${_file} to ${_copy}`);
      copySync(_file, _copy, { overwrite: true });
    }
  }
}
