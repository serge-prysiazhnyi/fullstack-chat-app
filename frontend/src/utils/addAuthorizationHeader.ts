import { AxiosRequestConfig } from 'axios';

export const addAuthorizationHeader = (
  token: string | null,
  options?: AxiosRequestConfig,
): AxiosRequestConfig => {
  if (!token) {
    return {
      ...options,
    };
  }

  return {
    ...options,
    headers: {
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};
