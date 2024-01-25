import { PreserveFiles } from "site/scripts/Backup.ts";
import { FindAllImages } from "./Find.ts";
import { ConvertAll } from "site/scripts/ImageMagick.ts";
import { RegisterAllImages } from "./Register.ts"

export async function OptimizeAllImages(backupDirectory: string, workspace?: string | URL) {

  /*
    1. Get all images;
    2. Registry all Images; 
    3. Make Backup of these images;
    4. Convert all images;
   */
  const images = await FindAllImages(workspace);
  await RegisterAllImages(images);
  ConvertAll(images)
}
