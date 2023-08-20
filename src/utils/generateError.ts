export const errorPrefix = '❌ ERROR:';

const generateErrorMessage = (message: string): string => (
  `${errorPrefix} ${message}`
);

export default generateErrorMessage;
