//

export function safeReturnUrl(url: string | null | undefined): string {
  if (!url || !url.startsWith('/')) {
    return '/dashboard';
  }
  return url;
}
