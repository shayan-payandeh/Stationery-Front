export const getValidatedBaseUrl = () => {
  const prodUrl = process.env.NEXT_PUBLIC_API_URL;
  const localUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;

  const baseUrl = process.env.NODE_ENV === "production" ? prodUrl : localUrl;
  const allowedDomains = ["localhost", "shayan-negaresh.shop"];

  if (!baseUrl || !allowedDomains.some((domain) => baseUrl.includes(domain))) {
    throw new Error("URL نامعتبر است");
  }
  return baseUrl;
};
