export const flattenObject = (
  obj: Record<string, any>,
  parentKey = ""
): Record<string, any> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      Object.assign(acc, flattenObject(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);
};

export const formatKey = (key: string) => {
  const words = key.replace(/_/g, " ").split(" ");
  const uniqueWords = words.filter(
    (word, index, arr) => word && word !== arr[index - 1]
  );
  return uniqueWords
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
