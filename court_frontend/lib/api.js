export class ApiError extends Error {
  constructor(url, status) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.status = status;
  }
}

export const fetchJson = async (url, options) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new ApiError(url, res.status);
  }

  return await res.json();
};
