import { petsHelpApi } from '@/shared/api/petsHelpApi';

export const setAuthHeader = (access_token: string) => {
  petsHelpApi.defaults.headers.common.Authorization = `Bearer ${access_token}`;
};

export const clearAuthHeader = () => {
  delete petsHelpApi.defaults.headers.common.Authorization;
};
