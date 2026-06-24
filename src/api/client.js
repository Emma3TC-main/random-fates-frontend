const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/v1";

const ACCESS_TOKEN_KEY = "rf_accessToken";
const REFRESH_TOKEN_KEY = "rf_refreshToken";
const AUTH_USER_KEY = "authUser";

export const tokenStore = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setSession({ user, tokens }) {
    if (tokens?.accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    if (tokens?.refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  },
  clearSession() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  },
  getUser() {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
};

export class ApiError extends Error {
  constructor(message, { status, code, details, response } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.response = response;
  }
}

export const cleanParams = (params = {}, limits = {}) => {
  const cleaned = {};
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (key === "limit") {
      const max = limits.maxLimit ?? 100;
      const parsed = Number(value);
      cleaned[key] = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), max) : value;
      return;
    }
    if (key === "page") {
      const parsed = Number(value);
      cleaned[key] = Number.isFinite(parsed) ? Math.max(parsed, 1) : value;
      return;
    }
    cleaned[key] = value;
  });
  return cleaned;
};

export const toQueryString = (params = {}, limits = {}) => {
  const query = new URLSearchParams(cleanParams(params, limits)).toString();
  return query ? `?${query}` : "";
};

const validationSummary = (details) => {
  if (!Array.isArray(details)) return "";
  return details
    .map((issue) => {
      const field = Array.isArray(issue.path) && issue.path.length ? issue.path.join(".") : "body";
      return `${field}: ${issue.message}`;
    })
    .join(" | ");
};

const buildHeaders = (headers = {}, auth = true, hasBody = false) => {
  const finalHeaders = { ...headers };
  if (hasBody && !finalHeaders["Content-Type"]) finalHeaders["Content-Type"] = "application/json";
  const token = tokenStore.getAccessToken();
  if (auth && token) finalHeaders.Authorization = `Bearer ${token}`;
  return finalHeaders;
};

const parsePayload = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const refreshAccessToken = async () => {
  const refreshToken = tokenStore.getRefreshToken();
  if (!refreshToken) return false;

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  const payload = await parsePayload(response);
  if (!response.ok || payload?.success === false) {
    tokenStore.clearSession();
    return false;
  }
  tokenStore.setSession(payload.data);
  return true;
};

export const apiFetch = async (endpoint, options = {}) => {
  const { auth = true, headers, body, skipRefresh = false, ...rest } = options;
  const hasBody = body !== undefined && body !== null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...rest,
    headers: buildHeaders(headers, auth, hasBody),
    body: hasBody && typeof body !== "string" ? JSON.stringify(body) : body,
  });

  let payload = await parsePayload(response);

  if (response.status === 401 && auth && !skipRefresh) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      return apiFetch(endpoint, { ...options, skipRefresh: true });
    }
  }

  if (!response.ok || payload?.success === false) {
    const details = payload?.error?.details;
    const detailText = validationSummary(details);
    throw new ApiError(
      detailText ? `${payload?.message || `API request failed: ${response.status}`}: ${detailText}` : payload?.message || `API request failed: ${response.status}`,
      {
        status: response.status,
        code: payload?.error?.code,
        details,
        response: payload,
      },
    );
  }

  return payload;
};

export const getData = async (endpoint, options = {}) => {
  const response = await apiFetch(endpoint, options);
  return response.data;
};
