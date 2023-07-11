import { StyleFunctionProps } from '@chakra-ui/styled-system';

export const ProgressStyle = {
  baseStyle: {
    filledTrack: {
      bg: '#000814',
    },
    track: {
      bg: 'linear-gradient(270deg, rgba(0, 0, 0, 0.58) 1.12%, rgba(0, 0, 0, 0.1) 11.87%, rgba(0, 53, 102, 0.42) 36.29%, rgba(0, 53, 102, 0.13) 81.76%, rgba(0, 53, 102, 0.38) 98.13%);',
    },
  },

  defaultProps: {
    size: 'md',
    colorScheme: '#000814',
  },
};
