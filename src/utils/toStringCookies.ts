export function toStringCookies(cookies) {
  const strCookie = cookies.get("accessToken")
    ? cookies.get("accessToken").name +
      "=" +
      cookies.get("accessToken").value +
      ";"
    : [];
  // cookies.getAll().forEach((item: any) => {
  //   strCookie += `${item?.name}=${item?.value};`;
  // });
  return strCookie;
}
