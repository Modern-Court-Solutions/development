export class ApiError extends Error {
  constructor(url: string, status: number, message: string) {
    super(`'${url}' returned ${status}`);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
    this.name = "ApiError";
    this.message = message;
  }
}

export const fetchJson = async (url: string, options: any) => {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new ApiError(url, res.status, "Invalid login credentials");
  }

  return await res.json();
};
