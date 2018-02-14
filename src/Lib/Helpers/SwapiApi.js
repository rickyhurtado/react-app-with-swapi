export function getUrlID(url) {
  const segments = url.split('/');
  return segments[segments.length - 2];
}

export function getUrlPage(url) {
  if (!url) {
    return null;
  }

  const segments = url.split('?');
  return segments[1].split('=')[1];
}
