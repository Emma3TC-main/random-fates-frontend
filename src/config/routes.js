export const ADMIN_CONSOLE_PATH = (
  process.env.REACT_APP_ADMIN_CONSOLE_PATH || "/ops-console"
).replace(/\/+$/, "");

export const adminPath = (subPath = "") => {
  const normalized = subPath.startsWith("/") ? subPath : `/${subPath}`;
  return `${ADMIN_CONSOLE_PATH}${normalized === "/" ? "" : normalized}`;
};
