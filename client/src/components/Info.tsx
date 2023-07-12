// @flow 
import { Alert, AlertIcon } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode
};
export const Info = ({children}: Props) => {
    return (
        <Alert status='info'>
        <AlertIcon />
        {children}
      </Alert>
    );
};