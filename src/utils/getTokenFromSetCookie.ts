export function getTokenFromSetCookie(header) {
  if (!header) return null;

  const cookies = header.split(";").map((cookie) => cookie.trim());
  const jwtCookie = cookies.find((cookie) => cookie.startsWith("accessToken="));
  if (jwtCookie) {
    return jwtCookie.split("=")[1];
  }

  return null;
}
