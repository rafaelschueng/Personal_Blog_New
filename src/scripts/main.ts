import { OptimizeAllImages } from './Optimize.ts'

(async () => {
  await OptimizeAllImages('raw', `${Deno.cwd()}/testing`);
})();
