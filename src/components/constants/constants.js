export const COLORS = {
  light_mode: {
    text: "hsl(200, 15%, 8%)",
    background: "hsl(0, 0%, 98%)",
    input: "hsl(0, 0%, 52%)",
  },
  dark_mode: {
    elements: "hsl(209, 23%, 22%)",
    background: "hsl(207, 26%, 17%)",
  },
  white: "hsl(0, 0%, 100%)",
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 1080,
  exclusiveWidth1: 1320,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  exclusiveWidth1: `(max-width: ${BREAKPOINTS.exclusiveWidth1 / 16}rem)`,
};
