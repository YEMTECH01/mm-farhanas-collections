export const ADMIN_USERNAME_KEY = "mm_admin_username";
export const ADMIN_PASSWORD_KEY = "mm_admin_password";
export const DEFAULT_ADMIN_USERNAME = "admin";
export const DEFAULT_ADMIN_PASSWORD = "luxury2024";

export function getCookieValue(
  cookieHeader: string | null | undefined,
  key: string,
) {
  if (!cookieHeader) return "";

  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${key}=`));

  if (!match) return "";
  return decodeURIComponent(match.slice(key.length + 1));
}

export function getStoredAdminCredentials(cookieHeader?: string | null) {
  const username =
    getCookieValue(cookieHeader, ADMIN_USERNAME_KEY) ||
    process.env.ADMIN_USERNAME ||
    DEFAULT_ADMIN_USERNAME;

  const password =
    getCookieValue(cookieHeader, ADMIN_PASSWORD_KEY) ||
    process.env.ADMIN_PASSWORD ||
    DEFAULT_ADMIN_PASSWORD;

  return { username, password };
}

export function saveAdminCredentials(username: string, password: string) {
  if (typeof document === "undefined") return false;

  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (!trimmedUsername || !trimmedPassword) return false;

  const cookieOptions = "path=/; max-age=31536000; SameSite=Lax";

  document.cookie = `${ADMIN_USERNAME_KEY}=${encodeURIComponent(trimmedUsername)}; ${cookieOptions}`;
  document.cookie = `${ADMIN_PASSWORD_KEY}=${encodeURIComponent(trimmedPassword)}; ${cookieOptions}`;

  localStorage.setItem(ADMIN_USERNAME_KEY, trimmedUsername);
  localStorage.setItem(ADMIN_PASSWORD_KEY, trimmedPassword);

  return true;
}

export function getLocalAdminCredentials() {
  if (typeof window === "undefined") return null;

  const username = localStorage.getItem(ADMIN_USERNAME_KEY)?.trim();
  const password = localStorage.getItem(ADMIN_PASSWORD_KEY)?.trim();

  if (!username || !password) return null;

  return { username, password };
}
