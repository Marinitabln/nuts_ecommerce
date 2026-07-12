export const slugify = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "-");

export const capitalizeFirst = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
