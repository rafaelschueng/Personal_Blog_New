import { Entries, FindByName } from "./Find.ts";
import { ExecCommandAsync } from "./Commands.ts";
import { AppendDirectories, BasePath, MakeDirectory } from "site/scripts/Utils.ts";
import { existsSync } from "deno/fs/mod.ts";
import { FileBackupPlainning } from "site/scripts/Backup.ts";
import { ConvertAllUsingWASM, ConvertUsingWASM, IMagickArguments } from "site/scripts/ImageMagickWasm.ts";

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
  const command = await ExecCommandAsync(imagemagick.path, [
    "convert",
    inputImage.href,
    "-auto-orient",
    outputImage.href,
  ]);
  console.log(command);
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

export interface Plainning {
  file: URL;
  source: URL;
  commands: IMagickArguments;
}

interface FileConversionPlainning {
  planning: Plainning[];

  backup: FileBackupPlainning;
}

function ConversionMimetypes() {
  return [".webp", ".avif"];
}

function ConversionSizes() {
  const sizes = [
    {
      suffix: "-small",
      folder: "small",
      magick: {
        resize: 0.25,
      },
    },
    {
      suffix: "-medium",
      folder: "medium",
      magick: {
        resize: 0.50,
      },
    },
    {
      suffix: "-large",
      folder: "large",
      magick: {
        resize: 1.0,
      },
    },
  ];
  return sizes;
}

export function ReplaceMimetype(file: URL, mimetype: string): URL {
  if (!mimetype.startsWith(".")) throw new Error("Mimetype argument not starts with dot!");
  const _file = file.toString();
  const pattern = /\.\w{3,5}$|\.\w{3,5}\/$/g;
  if (!pattern.test(_file)) throw new Error(`The ${file} is not a complete path of file!`);
  const result = _file.replace(pattern, mimetype);
  return new URL(result);
}

function AddSuffix(file: URL, suffix: string) {
  let [_file, _mimetype] = file.toString().split(".");
  _mimetype = `.${_mimetype}`;
  _file = _file += suffix;
  _file = _file += _mimetype;
  return new URL(_file);
}

function ConversionAndResizingPlanning(image: FileBackupPlainning): FileConversionPlainning {
  const mimetypes = ConversionMimetypes();
  const _file = image.files.origin;
  const files = mimetypes.map((mimetype) => ReplaceMimetype(_file, mimetype));
  const sizes = ConversionSizes();

  //must return resizing imagemagick command with folder
  const plannings = files.map((file) =>
    sizes.map((size) => {
      const newFiles = AddSuffix(file, size.suffix);
      return {
        file: newFiles,
        commands: { resize: size.magick.resize },
        source: _file,
      };
    })
  ).flat();
  const conversion = { planning: plannings, backup: image };
  return conversion;
}

async function ConvertAll(files: FileConversionPlainning[]) {
  const plainnings = files
    .map((file) => file.planning)
    .flat()
    .filter(file => !file.source.toString().endsWith('svg')); // remove this after filter added in function FindAllImages
  await ConvertAllUsingWASM(plainnings)
}

export async function ConvertAndResizeBackups(images: Array<FileBackupPlainning>) {
  const conversions = images.map((image) => ConversionAndResizingPlanning(image));
  await ConvertAll(conversions);
  return conversions;
}
