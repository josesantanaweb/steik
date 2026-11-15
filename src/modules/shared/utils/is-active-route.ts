export const isActiveRoute = (
  pathname: string,
  href: string,
  rootHref = "/"
): boolean => {
  if (href === rootHref) return pathname === rootHref;

  return pathname === href || pathname.startsWith(`${href}/`);
};
