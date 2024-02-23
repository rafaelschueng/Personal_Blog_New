import { OptimizeAllImages } from './Optimize.ts'

(async () => {
  const workspace = new URL(`file:${Deno.cwd()}/testing`)
  const backupDirectory = new URL (`file:${Deno.cwd()}/testing/backup`)
  // const backupDirectory = './backup'
  await OptimizeAllImages(workspace, backupDirectory)
})();
