import { StyleFunctionProps } from '@chakra-ui/styled-system';

export const formLabelStyle = {
  baseStyle: (props: StyleFunctionProps) => ({
    fontSize: { base: '14px', md: '12px', lg: '1.1vw' },
    fontWeight: 500,
    textTransform: 'capitalize',
    color:  props.theme.colors[props.colorMode].blue3,
  }),

  defaultProps: {
    size: 'md',
    variant: 'normal',
    colorScheme: (props: StyleFunctionProps) => props.theme.colors.primary,
  },
};
