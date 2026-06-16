function splitWords(value: string) {
  return (
    value
      .replace(/([a-z\d])([A-Z])/g, "$1 $2")
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
      .replace(/['"]/g, "")
      .match(/[A-Za-z0-9]+/g) || []
  ).map((word) => word.toLowerCase());
}

function capitalize(word: string) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

function toSentence(value: string) {
  const normalized = splitWords(value).join(" ");
  return normalized ? capitalize(normalized) : "";
}

function toTitle(value: string) {
  return splitWords(value).map(capitalize).join(" ");
}

export function buildCaseResults(value: string) {
  const words = splitWords(value);
  const [first = "", ...rest] = words;

  return [
    { label: "camelCase", value: first + rest.map(capitalize).join("") },
    { label: "PascalCase", value: words.map(capitalize).join("") },
    { label: "snake_case", value: words.join("_") },
    { label: "kebab-case", value: words.join("-") },
    { label: "CONSTANT_CASE", value: words.join("_").toUpperCase() },
    { label: "dot.case", value: words.join(".") },
    { label: "path/case", value: words.join("/") },
    { label: "Title Case", value: toTitle(value) },
    { label: "Sentence case", value: toSentence(value) },
    { label: "lowercase", value: value.toLowerCase() },
    { label: "UPPERCASE", value: value.toUpperCase() },
  ];
}
