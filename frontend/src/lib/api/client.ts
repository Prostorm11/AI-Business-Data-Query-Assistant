const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function apiPost<TResponse>(
  endpoint: string,
  body: unknown
): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong");
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function apiGet<TResponse>(endpoint: string): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || "Something went wrong");
  }

  return data;
}