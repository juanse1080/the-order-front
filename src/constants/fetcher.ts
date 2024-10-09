import { API_URL } from './config';

export const fetcher = (resource: URL | string, init: any) => {
  if (typeof resource === 'string')
    return fetch(`${API_URL}/${resource}`, init).then((res) => res.json());
};
