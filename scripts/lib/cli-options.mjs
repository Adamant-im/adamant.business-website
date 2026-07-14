function takeValue(args, index, flag) {
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value`);
  return value;
}

export function parseSyncOptions(args) {
  const options = {
    force: false,
    noMerge: false,
    noPr: false,
    url: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--force') options.force = true;
    else if (argument === '--no-merge') options.noMerge = true;
    else if (argument === '--no-pr') options.noPr = true;
    else if (argument === '--url') {
      options.url = takeValue(args, index, '--url');
      index += 1;
    } else if (argument.startsWith('--url=')) options.url = argument.slice('--url='.length);
    else throw new Error(`Unknown option: ${argument}`);
  }

  if (options.force && !options.url) throw new Error('--force requires --url');
  return options;
}

export function parseRemoveOptions(args) {
  const options = {
    noMerge: false,
    noPr: false,
    slug: null,
    url: null,
  };

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--no-merge') options.noMerge = true;
    else if (argument === '--no-pr') options.noPr = true;
    else if (argument === '--url') {
      options.url = takeValue(args, index, '--url');
      index += 1;
    } else if (argument.startsWith('--url=')) options.url = argument.slice('--url='.length);
    else if (argument === '--slug' || argument === '-slug') {
      options.slug = takeValue(args, index, argument);
      index += 1;
    } else if (argument.startsWith('--slug=')) options.slug = argument.slice('--slug='.length);
    else if (argument.startsWith('-slug=')) options.slug = argument.slice('-slug='.length);
    else throw new Error(`Unknown option: ${argument}`);
  }

  if (Boolean(options.url) === Boolean(options.slug)) {
    throw new Error('Provide exactly one of --url or --slug');
  }
  return options;
}
