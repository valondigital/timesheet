import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import PageHeader from './PageHeader';

type Props = {
  children: ReactNode;
  title: string;
};
export const PageScaffold = (props: Props) => {
  return (
    <>
      <PageHeader title={props.title} />
      <Box maxW='100%' p={4}>
        {props.children}
      </Box>
    </>
  );
};


export default PageScaffold;
