export function declension(
  singular: string,
  genitive: string,
  plural: string = genitive,
  fallback: string = plural
) {
  return function(val: number): string {
    if (typeof val !== "number") {
      return fallback ?? plural;
    }

    if (!Number.isInteger(val)) {
      val = Math.floor(val);
    }

    val = Math.abs(val);
    const n = Math.abs(val) % 100;
    const n1 = n % 10;

    if (n > 10 && n < 20) {
      return plural;
    }

    if (n1 > 1 && n1 < 5) {
      return genitive;
    }

    if (n1 === 1) {
      return singular;
    }

    return plural;
  };
}
