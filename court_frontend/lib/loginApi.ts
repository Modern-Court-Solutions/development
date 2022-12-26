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

export const fetchData = async (url: string, options: any) => {
  console.log(options.headers.Authorization);
  if (options.headers.Authorization === "Token null") {
    console.log("redirecting");
    return {
      redirect: {
        permanent: false,
        destination: "/admin/authentication/login",
      },
    };
  }
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new ApiError(url, res.status, "Invalid credentials");
  }
  return await res.json();
};
