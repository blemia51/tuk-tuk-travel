

export function getPublicAssets(link) {
  return `${process.env.PUBLIC_URL || ''}${link}`;
}

