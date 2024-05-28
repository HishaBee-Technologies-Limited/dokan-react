import { cookies } from 'next/headers';

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

export const authFetchAPI = (
  url: string,
  method: string,
  payload: any,
  tags?: string[]
) => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token?.value}`,
    Platform: 'WEB',
  };
  console.log('----header---', headers);
  return fetch(`${BaseURL}${url}`, {
    method,
    headers,
    ...(method === 'POST' && {
      body: JSON.stringify({
        ...payload,
      }),
    }),
    ...(method === 'PUT' && {
      body: JSON.stringify({
        ...payload,
      }),
    }),
    next: {
      //TODO: change it properly adds tags
      tags: tags ? ['get-roles'] : [],
    },
    cache: 'no-store',
  });
};

export const uploadFetchApi = (
  url: string,
  method: string,
  payload: any,
  tags?: string[]
) => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token');
  return fetch(`${BaseURL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
    ...(method === 'POST' && {
      body: payload,
    }),
    ...(method === 'PUT' && {
      body: JSON.stringify({
        ...payload,
      }),
    }),
    next: {
      //TODO: change it properly adds tags
      tags: tags ? ['get-roles'] : [],
    },
    cache: 'no-store',
  });
};

export const api = {
  get: async (url: string, tags?: string[]) => await fetchAPI(url, 'GET', tags),
  post: (url: string, payload?: any, tags?: string[]) =>
    fetchAPI(url, 'POST', payload, tags),
};

export const authApi = {
  get: async (url: string, tags?: string[]) =>
    await authFetchAPI(url, 'GET', tags),
  post: (url: string, payload?: any, tags?: string[]) =>
    authFetchAPI(url, 'POST', payload, tags),
  put: (url: string, payload?: any, tags?: string[]) =>
    authFetchAPI(url, 'PUT', payload, tags),
  delete: (url: string, tags?: string[]) => authFetchAPI(url, 'DELETE', tags),
};

export const uploadApi = {
  get: async (url: string, tags?: string[]) =>
    await uploadFetchApi(url, 'GET', tags),
  post: (url: string, payload?: any, tags?: string[]) =>
    uploadFetchApi(url, 'POST', payload, tags),
  put: (url: string, payload: any, tags?: string[]) =>
    uploadFetchApi(url, 'PUT', payload, tags),
  delete: (url: string, tags?: string[]) => uploadFetchApi(url, 'DELETE', tags),
};
