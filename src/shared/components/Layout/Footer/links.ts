// SSR-safe базовий origin без трейлінг-слеша
export const ORIGIN =
  typeof window !== "undefined" ? window.location.origin : "http://localhost";

// Небезпечні протоколи, які ніколи не повинні ставати клікабельними
export const isUnsafeProtocol = (to: string): boolean => {
  const lower = (to || "").trim().toLowerCase();
  return lower.startsWith("javascript:") || lower.startsWith("data:");
};

// Чи є посилання зовнішнім щодо нашого ORIGIN
export const isExternal = (to: string): boolean => {
  if (!to) return false;
  const lower = to.trim().toLowerCase();

  // якорі та відносні шляхи — внутрішні
  if (lower.startsWith("#")) return false;

  // mailto/tel враховуємо як "зовнішні" (але відкривати будемо без _blank)
  if (lower.startsWith("mailto:") || lower.startsWith("tel:")) return true;

  // Небезпечні протоколи не вважаємо зовнішніми (їх узагалі не рендеримо як <a>)
  if (isUnsafeProtocol(lower)) return false;

  try {
    const url = new URL(to, ORIGIN);
    const isHttp = url.protocol === "http:" || url.protocol === "https:";
    return !isHttp || url.origin !== ORIGIN;
  } catch {
    // Невалідне значення — трактуємо як внутрішнє
    return false;
  }
};

// Для внутрішніх посилань повертаємо тільки шлях (щоб <Link> працював коректно)
export const toInternalPath = (to: string): string => {
    const raw =(to ?? "").trim();
    if (!raw) return raw;
    // 1) Hash-only – залишаємо як є, щоб якір працював від поточного роуту
  if (raw.startsWith("#")) return raw;

  // 2) Небезпечні протоколи – деградуємо в "ніщо"
  if (isUnsafeProtocol(raw)) return "#";

  // 3) Нормалізація same-origin шляху
  try {
    const url = new URL(to, ORIGIN);
    return url.origin === ORIGIN ? `${url.pathname}${url.search}${url.hash}` : raw;
  } catch {
    return raw;
  }
};
