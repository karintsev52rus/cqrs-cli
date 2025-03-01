export function toCamelCase(name: string): string {
  const nameArray = name.split("-");
  if (nameArray.length > 1) {
    const camelCaseArray = nameArray.map((w) => {
      const firstLetter = w[0];
      const restLetters = w.slice(1, w.length);
      const upperCaseFirstLetter = firstLetter.toUpperCase();
      return `${upperCaseFirstLetter}${restLetters}`;
    });
    return camelCaseArray.join("");
  }
  return name;
}
