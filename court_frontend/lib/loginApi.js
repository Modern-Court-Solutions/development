export const fetchLogin = async (url, options) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new ApiError(url, res.status);
  }

  return await res.json();
};
