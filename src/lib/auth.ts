export const shortSessionAge = 60 * 60 * 8;
export const rememberedSessionAge = 60 * 60 * 24 * 7;

export function authDestination(search: string) {
  const value = new URLSearchParams(search).get("callbackUrl");
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    /[\\\r\n]/.test(value)
  )
    return "/";
  return value;
}

export function passwordStrength(value: string) {
  const score = [
    value.length >= 8,
    /[a-z]/.test(value),
    /[A-Z]/.test(value),
    /[0-9]/.test(value),
    /[^A-Za-z0-9]/.test(value),
  ].filter(Boolean).length;
  return {
    percent: value ? score * 20 : 0,
    label:
      score < 3
        ? "Weak"
        : score === 3
          ? "Fair"
          : score === 4
            ? "Good"
            : "Strong",
  };
}
