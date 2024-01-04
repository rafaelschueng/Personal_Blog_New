import { copySync, existsSync } from "deno/fs/mod.ts";
import { AppendDirectories, BasePath, SanitizeNonWord } from "site/scripts/Utils.ts";
import { Entries } from "site/scripts/Find.ts";

export function PreserveFiles(files: Array<string> | Array<Entries>, folder: string) {
  let folders = files.map((image) => BasePath((image as Entries)?.path.pathname ?? image));
  folders = Array.from(new Set(folders));
  folders.map((path) => BackupFiles(path, folder));
}
 /** Makes a new directory to backup
  * @param {string} workspace
 */
export function MakeBackupDirectory(workspace: string | URL, path: string | URL) {
  const _workspace = (workspace as URL)?.pathname ?? workspace;
  const _path = (path as URL)?.pathname ?? path;
  const _backupDirectory = AppendDirectories(_workspace, _path);
  if (!existsSync(_backupDirectory)) {
    console.log(`Creating a new directory: ${_backupDirectory} to backup!`);
    Deno.mkdirSync(_backupDirectory);
    return _backupDirectory;
  }
  console.error(new Error(`The directory: ${_backupDirectory} already exists!`));
  return _backupDirectory;
}

/** Make a backup from file to an specific destiny*/
export function BackupFile(filePath: string, destiny: string) {
  const workspace = BasePath(filePath);
  MakeBackupDirectory(workspace, destiny);
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
  const copyDir = MakeBackupDirectory(_workspace, _destiny);
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
