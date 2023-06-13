import { StyleFunctionProps, useColorModeValue } from "@chakra-ui/react";

export const HeadingStyle = {
  baseStyle: () => ({
    fontSize: { base: "16px", lg: "1.2vw" },
  }),

  sizes: {
    md: {
      fontSize: "60px",
      fontWeight: "600",
      lineHeight: "72px",
      letterSpacing: "-0.04em",
    },
  },
  variants: {
    primary: (props: StyleFunctionProps) => ({
      fontWeight: "600",
      fontSize: "60px",
    }),
    secondary: (props: StyleFunctionProps) => ({
      color:
        props.colorMode === "dark"
          ? props.theme.colors.primary["dark"]
          : props.theme.colors.gray4,
      fontWeight: "600",
      fontSize: "41px",
    }),
    h1: (props: StyleFunctionProps) => ({
      fontWeight: 600,
      fontSize: "52px",
      lineHeight: "62px",
    }),
    tertiary: (props: StyleFunctionProps) => ({
      color:
        props.colorMode === "dark"
          ? props.theme.colors.primary["dark"]
          : props.theme.colors.gray4,
      fontWeight: "600",
      fontSize: "36px",
    }),
    cardHeader: (props: StyleFunctionProps) => ({
      fontWeight: "700",
      fontSize: "18px",
      color: props.theme.colors.primary,
    }),
    defaultProps: {
      size: "md",
      variant: "primary",
    },
  },
  defaultProps: {},
};
