export const API_BASE = import.meta.env.VITE_API_BASE;

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  console.log("ENDPOINT: ", API_BASE + path);
  const res = await fetch(API_BASE + path, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  return res.json();
}
