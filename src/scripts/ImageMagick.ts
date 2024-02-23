import { Entries, FindByName } from "./Find.ts";
import { ExecCommandAsync } from "./Commands.ts";
import { BasePath, MakeDirectory, AppendDirectories } from "site/scripts/Utils.ts";
import { existsSync } from "deno/fs/mod.ts";

export async function Dependencies() {
  const tools = [
    { target: "identify", path: "" },
    { target: "convert", path: "" },
    { target: "mogrify", path: "" },
    { target: "magick", path: "" },
  ];

  const result = await Promise.all(tools.map((tool) => FindByName(tool.target, `${Deno.cwd()}/bin`, ".git")));
  const executables = result.flat();

  executables.forEach((executable) => {
    tools.forEach((tool) => {
      const isToolAvailable = executable.entry.name.includes(tool.target) && executable.entry.isFile;
      if (isToolAvailable) {
        tool.path = executable.path.toString();
      }
    });
  });

  const allToolsAvailable = tools.every((tool) => tool.path.length);
  if (!allToolsAvailable) throw new Error("Not all tools available to process all images using imagemagick!");
  return tools;
}

export async function ImageMagick() {
  const dependencies = await Dependencies();
  const imagemagick = dependencies.filter((dependency) => dependency.target.includes("magick"))[0];
  return imagemagick;
}

export async function Info(path: string) {
  const imagemagick = await ImageMagick();
  return await ExecCommandAsync(imagemagick.path, ["identify", "-ping", path]);
}

//TODO: finish this function
export async function Convert(inputImage: URL, outputImage: URL) {
  const imagemagick = await ImageMagick();
  console.log(`Converting ${inputImage} to ${outputImage}`);
  const command = await ExecCommandAsync(imagemagick.path, ["convert", inputImage.href, "-auto-orient", outputImage.href]);
  console.log(command);
}

export function ChangeMimeType(file: string, mimetype: string): string {
  if (!mimetype.startsWith(".")) throw new Error("Mimetype argument not starts with dot!");
  const _file = file;
  const pattern = /\.\w{3,5}$|\.\w{3,5}\/$/g;
  if (!pattern.test(_file)) throw new Error(`The ${file} is not a complete path of file!`);
  const result = _file.replace(pattern, mimetype);
  return result
}

function GenerateOutputFiles(path: URL, destinations: Array<URL>, mimetypes: Array<string>) {
  const newFiles = destinations.map((directory) => {
    const _$ = path.href.split("/");
    const name = _$[_$.length - 1];
    const file = (directory as URL)?.pathname?.concat(name) ?? directory.toString().concat(name);
    return mimetypes.map((mimetype) => ChangeMimeType(file, mimetype));
  }).flat();

  return newFiles;
}

function GenerateOutputPaths(paths: Array<URL>) {
  const newDestionations = paths.map((path) => MakeDirectory(path));
  return newDestionations;
}

function ConversionPreviouslyExists(path: string, newPaths: Array<string>) {
  const names = path.split("/");
  const canCreate = newPaths.some((newPath) => names.some((name) => name === newPath));
  return canCreate;
}

function ValidateFileCreation(files: Array<string>) {
  try {
    const notYetCreated = files.filter((file) => {
      const notExists = !existsSync(file);
      if (notExists) {
        console.log(`The file ${file} not exists and will be created and converted!`);
        return file;
      }
    });
    return notYetCreated;
  } catch (error) {
    console.error(new Error(error));
    return [];
  }
}


// add capability to avoid replicate /small inside /small again and etc...
function Prepare(path: URL): URL[] {
  const mimetypes = [".webp", ".avif"];
  const sizedDirectories = ["small", "medium", "large"].map(size => new URL(`file:${path.href}/${size}`))
  //will be removed!
  const backupDirectories = sizedDirectories.map(size => AppendDirectories(path, size))

  const output = GenerateOutputPaths(sizedDirectories);
  const files = GenerateOutputFiles(path, output, mimetypes)
  .map(file => new URL(file));
  return files;
}

export function ConvertAll(images: Array<Entries>) {
  images.forEach((image) => {
    const output = Prepare(image.path);
    output.forEach(async (newFile) => await Convert(image.path, newFile));
  });
}
