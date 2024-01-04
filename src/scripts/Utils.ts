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

export function BasePath(directory: string | URL) {
  let path: string = "";
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
    return new URL(`file:///${_path.join("/")}`);
  }

  let _path = path.split("/");
  if (typeof toBeAppended === "string") _path.push(toBeAppended);
  if (Array.isArray(toBeAppended)) _path.push(...toBeAppended);
  return _path.join('/');
}
