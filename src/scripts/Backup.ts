import { BasePath, MakeDirectory } from "site/scripts/Utils.ts";
import { Entries } from "site/scripts/Find.ts";

function IsNotABackup (file: URL, destiny: URL) {
  return !file.toString().includes(destiny.toString())
}

export function PreserveFiles(files: Array<Entries>, backupDirectory: URL | string) {

  let plainnings = files.map(file => BackupPlainning(file, backupDirectory))
  plainnings = plainnings.filter(plainning => IsNotABackup(plainning.files.origin, plainning.paths.backup))
  plainnings.forEach(file => BackupFile(file.files.origin, file.files.backup, file.paths.backup))
  
  return plainnings
}

export function BackupFile(filePath: URL, fileBackup:URL, destiny: URL) {
  MakeDirectory(destiny);
  console.log(`Copying file: ${filePath} to ${fileBackup} in path $: ${destiny}`)
  Deno.copyFileSync(filePath, fileBackup)
}

function AddSlashAtEnd(path: URL | string): string {
  const _path = path.toString();
  const endsWithSlash = _path.endsWith("/");
  if (endsWithSlash) return _path.toString();
  return `${path}/`;
}

function IsUri(path: URL | string) {
  return path.toString().startsWith("file:") || path instanceof URL;
}

function IsLocallyPath(path: string) {
  return path.startsWith("./");
}

function IsLocallyOrUri(path: URL | string): void {
  const isUri = IsUri(path);
  const isLocally = IsLocallyPath(path.toString());
  if (!isUri && !isLocally) throw new Error(`Incorrect parameter format: ${path}`);
}

function ExtractFolderNames(path: string | URL) {
  const _path = path.toString();
  const names = _path.split("/");
  return names;
}

function PlanBackupDirectory(workspace: URL, destiny: URL | string): URL {
  IsLocallyOrUri(destiny);
  const isUri = IsUri(destiny);
  if (isUri) {
    const _names = ExtractFolderNames(workspace);
    const _destiny = AddSlashAtEnd(destiny);
    const _customFolder = _names[_names.length - 1];
    return new URL(`${_destiny}${_customFolder}`);
  }
  let _destiny = destiny.toString().split("./")[1];
  _destiny = AddSlashAtEnd(_destiny);
  const _workspace = AddSlashAtEnd(workspace);
  return new URL(`${_workspace}${_destiny}`);
}


function PlanBackupFile(workspace: URL, destiny: URL | string, filename: string): URL {
  //if the destiny is a URI, returns the destiny concatened with file.
  //otherwise, returns the workspace, destiny and file concatened
  let _destiny = destiny.toString();
  const isUri = IsUri(_destiny);
  if (isUri) {
    _destiny = AddSlashAtEnd(_destiny);
    const names = ExtractFolderNames(workspace)
    const customFolder = AddSlashAtEnd(names[names.length - 1])
    _destiny = _destiny += customFolder
    return new URL(`${_destiny}${filename}`);
  }
  _destiny = destiny.toString().split("./")[1];
  _destiny = AddSlashAtEnd(_destiny);
  const _workspace = AddSlashAtEnd(workspace);
  return new URL(`${_workspace}${_destiny}${filename}`);
}

interface NonExistentFile {
  name: string;
  paths: { origin: URL; backup: URL };
  files: { origin: URL; backup: URL };
}

function BackupPlainning (file: Entries, destiny: string | URL): NonExistentFile {
  const originPath = BasePath(file.path);
    const backupPath = PlanBackupDirectory(originPath, destiny);
    const originFile = file.path // replace by file.path
    const backupFile = PlanBackupFile(originPath, destiny, file.name);
    const _file = {
      name: file.name,
      paths: { origin: originPath, backup: backupPath },
      files: { origin: originFile, backup: backupFile },
    };
    return _file;
}


function MakeBackupFolders(plainnings: NonExistentFile[]) {
  let distincts = plainnings.map((planning) => planning.paths.backup.toString());
  distincts = Array.from(new Set(distincts));
  const folders = distincts.map((path) => new URL(path));
  const newFolders = folders.map((_folder) => MakeDirectory(_folder));
  return newFolders
}

/** Makes a recursive backup
 * @param {URL | string} workspace
 * @param {URL | string} destiny
 */
