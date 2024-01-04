import { Entries, FindByName } from "./Find.ts";
import { ExecCommandAsync } from "./Commands.ts";
import { AppendDirectories, BasePath } from "site/scripts/Utils.ts";

export async function Dependencies() {
  console.log("Verifiying all dependencies for imagemagick!");

  const tools = [
    { target: "identify", path: "" },
    { target: "convert", path: "" },
    { target: "mogrify", path: "" },
    { target: "magick", path: "" },
  ];

  const result = await Promise.all(tools.map((tool) => FindByName(tool.target, `${Deno.cwd()}/bin`, ".git")));
  const executables = result.flat();

  executables.forEach((executable) => {
    tools.map((tool) => {
      const isToolAvailable = executable.entry.name.includes(tool.target) && executable.entry.isFile 
      if (isToolAvailable) {
        tool.path = executable.path.toString();
        console.log(`Dependency: ${tool.target} found in: ${executable.path.toString()}`);
      }
    });
  });

  const allToolsAvailable = tools.every((tool) => tool.path.length);
  if (!allToolsAvailable) throw new Error("Not all tools available to process all images using imagemagick!");
  console.log("All dependencies are available!");
  return tools;
}

export async function ImageMagick () {
  const dependencies = await Dependencies();
  const imagemagick = dependencies.filter(dependency => dependency.target.includes('magick'))[0]
  return imagemagick;
}


export async function Info(path: string) {
  const imagemagick = await ImageMagick();
  return await ExecCommandAsync(imagemagick.path, ["identify", "-ping", path])
}

//TODO: finish this function
export async function Convert(inputImage: string, outputImage: string) {
  const imagemagick = await ImageMagick();
  const command = await ExecCommandAsync(imagemagick.path, ['convert', inputImage, '-auto-orient', outputImage])
  console.log(command)
}

type ProcessingPlaining = {
  path: string;
  destinations: Array<string | URL>
}

export async function ConvertAll(images: Array<string | Entries>) {
  const folderSizes: string[] = ['small', 'medium', 'large']
  const plaining: Array<ProcessingPlaining> = images.map(image => {
    const path = (image as Entries)?.path.pathname ?? image;
    const destination = folderSizes.map(size => AppendDirectories(BasePath(path), size))
    return {path: path, destinations: destination}
  })
  console.log(plaining);
}