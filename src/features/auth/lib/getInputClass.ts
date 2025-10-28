export const getInputClass = (error: boolean, success: boolean) => {
  if (error) return 'input-base border-red-tenn focus:border-red-tenn';
  if (success) return 'input-base border-tenn focus:border-tenn';
  return 'input-base';
};
