const FALLBACK_MEDIA_PATH = 'https://wows-gloss-icons.wgcdn.co/icons/';

export function withMediaPath(
  icons: Record<string, unknown> | undefined,
  mediaPath: string
): Record<string, string> {
  const result: Record<string, string> = {};
  Object.entries(icons || {}).forEach(([key, path]) => {
    if (typeof path === 'string' && path) {
      result[key] = `${mediaPath}${path}`;
    }
  });
  return result;
}

export { FALLBACK_MEDIA_PATH };
