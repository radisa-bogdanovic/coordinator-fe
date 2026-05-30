//

export function safeReturnUrl(url: string | null | undefined): string {
  if (!url || url.startsWith('/') || url.startsWith('//')) {
    return '/dashboard';
  }
  return url;
}
