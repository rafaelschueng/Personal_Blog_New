import { FindByName } from "./FindFiles.ts";
import { ExecCommandAsync } from "./Commands.ts";

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
}