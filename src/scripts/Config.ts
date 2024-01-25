import { BlogConfiguration } from "site/scripts/types/BlogConfig.ts";

function BlogConfigurationFile(path?: string | URL) {
  try {
    const file = path ? Deno.readTextFileSync(path) : Deno.readTextFileSync(`${Deno.cwd()}\\blog.config.json`);
    const configs: BlogConfiguration = JSON.parse(file) as BlogConfiguration;
    return configs;
  } catch (error) {
    console.error(new Error(error))
    throw new Error(error)
  }
}

export function GetBlogConfiguration(variable: string) {
  const configs = BlogConfigurationFile();
  return configs[variable as keyof BlogConfiguration];
}
