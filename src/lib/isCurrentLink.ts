function isCurrentLink(url: URL, slug: string): boolean {
  const urlStripped = url.pathname.replaceAll('/', '');

  return urlStripped === slug;
}

export default isCurrentLink;
