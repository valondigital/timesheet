import { StyleFunctionProps } from '@chakra-ui/styled-system';

export const InputStyle = {
  baseStyle: (props: StyleFunctionProps) => ({
    field: {
      bg: 'white',
      borderWidth: 1,
      ':focus': {
        borderWidth: 2,
        borderColor: props.theme.colors.primary,
      },
    },
  }),

  size: {
    sm: {
      // padding: 4,
    },
    md: {
      padding: { base: 12, lg: 6 },
    },
  },
  variants: {
    borderless: (props: StyleFunctionProps) => ({
      field: {
        borderWidth: 0,
        borderColor: 'transparent',
        ':focus': {
          borderWidth: 0,
          borderColor: 'transparent',
        },
      },
    }),
    outline: (props: StyleFunctionProps) => ({
      field: {
        bg: "transparent",
        borderRadius: "12px",
      }
    }),
  },
  defaultProps: {
    size: 'md',
    variant: 'normal',
    colorScheme: (props: StyleFunctionProps) => props.theme.colors.primary,
  },
};
