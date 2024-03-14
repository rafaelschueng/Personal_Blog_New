export function ExecCommand(path: string, args: Array<string>) {
  const command = new Deno.Command(path, { args: args });
  const { code, stdout, stderr } = command.outputSync();
  if (code) throw new Error(`Error trying to execute the command: ${path} with arguments: ${args.toString()} follow the error: ${new TextDecoder().decode(stderr)}`);
  return new TextDecoder().decode(stdout);
}

export async function ExecCommandAsync (path: string, args: Array<string>) {
    const command = new Deno.Command(path, {args: args});
    console.log(`${path} ${args[0]}`)
    const { code, stdout, stderr } = await command.output();
    if (code) throw new Error(`Error trying to execute the command: ${path} with arguments: ${args.toString()} follow the error: ${new TextDecoder().decode(stderr)}`);
    return new TextDecoder().decode(stdout);
  }