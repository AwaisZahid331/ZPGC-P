// Token manager for axios interceptor
let currentTokens = null;

export const setTokens = (tokens) => {
  currentTokens = tokens;
};

export const getTokens = () => {
  return currentTokens;
};

export const clearTokens = () => {
  currentTokens = null;
};
