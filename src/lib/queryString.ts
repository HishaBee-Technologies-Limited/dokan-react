export const generateQueryString = <
  Type extends Record<
    string,
    string | number | boolean | (string | number)[] | undefined | null
  >,
>(
  params: Type
): string => {
  const USP = new URLSearchParams();

  for (const paramKey in params) {
    let paramValue = params[paramKey as keyof Type];
    if (paramValue) {
      if (typeof paramValue === 'number' || typeof paramValue === 'boolean') {
        USP.set(paramKey, paramValue.toString());
      } else if (Array.isArray(paramValue)) {
        if (paramValue.length > 0) USP.set(paramKey, paramValue.join(','));
      } else {
        USP.set(paramKey, paramValue);
      }
    }
  }

  return USP.toString();
};
