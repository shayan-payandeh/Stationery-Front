type ParamValue = { [key: string]: string | string[] | undefined };

export const queryStringGenerator = (searchParams: ParamValue) => {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          params.append(key, v);
        });
      } else {
        params.set(key, value);
      }
    }
  });
  return params.toString();
};
