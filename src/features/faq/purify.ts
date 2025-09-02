// локальний інстанс + хук реєструється один раз
import createDOMPurify from "dompurify";

const PURIFY = typeof window !== "undefined" ? createDOMPurify(window) : null;

// додатковий захист для <a>: блокуємо небезпечні URI, додаємо rel для _blank
if (PURIFY) {
  PURIFY.addHook("afterSanitizeAttributes", (node: Element) => {
    if (node.nodeName === "A" && (node as HTMLElement).getAttribute("href")) {
      const href = ((node as HTMLElement).getAttribute("href") || "").trim();
      const ok = /^(https?:|mailto:|tel:|\/(?!\/)|#)/i.test(href);
      if (!ok) (node as HTMLElement).removeAttribute("href");
      if ((node as HTMLElement).getAttribute("target") === "_blank") {
        (node as HTMLElement).setAttribute("rel", "noopener noreferrer");
      }
    }
  });
}

const ALLOWED_TAGS = ["p","br","strong","em","ul","ol","li","a","blockquote","code","pre"] as const;
const ALLOWED_ATTR = ["href","title","target","rel"] as const;

// Єдина функція для санітизації
export function sanitizeHtml(html: string): string {
  if (!PURIFY) return "";
  return PURIFY.sanitize(html, {
    ALLOWED_TAGS: ALLOWED_TAGS as unknown as string[],
    ALLOWED_ATTR: ALLOWED_ATTR as unknown as string[],
    // додатково фільтруємо URI (дає захист навіть без хука)
    ALLOWED_URI_REGEXP: /^(?:(?:https?:|mailto:|tel:)|\/(?!\/)|#)/i,
  });
}
