const BaseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAPI = (
  url: string,
  method: string,
  payload: any,
  tags?: string[],
  cache?: boolean
) => {
  return fetch(`${BaseURL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Platform: 'WEB',
    },
    ...(method === 'POST' && {
      body: JSON.stringify({
        ...payload,
      }),
    }),
  });
};

export const apiClient = {
  get: async (url: string, tags?: string[]) => await fetchAPI(url, 'GET', tags),
  post: (url: string, payload?: any, tags?: string[]) =>
    fetchAPI(url, 'POST', payload, tags),
};
