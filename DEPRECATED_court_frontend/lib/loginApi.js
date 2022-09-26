export const fetchLogin = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    return false;
  }

  return await res.json();
};
