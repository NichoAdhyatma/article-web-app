export const cleanStringFromHTML = (str: string): string => {
  if (!str) return "";

  const withoutTags = str.replace(/<\/?[^>]+(>|$)/g, "");

  const withoutEntities = withoutTags.replace(/&[^;\s]+;/g, "");

  const cleanText = withoutEntities.replace(/\s+/g, " ").trim();

  return cleanText;
};
