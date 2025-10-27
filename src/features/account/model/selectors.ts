import { RootState } from '@/app/store';

export const selectLoading = (state: RootState) => state.specInfo.loading;
export const selectError = (state: RootState) => state.specInfo.error;
export const selectSpecInfo = (state: RootState) => state.specInfo.specInfo;
