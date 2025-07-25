export const SHORTCODE_REGEX = /^_([a-zA-Z0-9]{6})$/;

export const isValidShortcode = (shortCode: string): boolean => {
  return SHORTCODE_REGEX.test(shortCode);
};
