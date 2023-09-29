import { FormEvent } from 'react';
import { LinkBox, LinkOverlay } from '@chakra-ui/react';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  height?: string
};
const Clickable = (props: Props) => {
  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    props.onClick();
  };
  return (
    <LinkBox height={props.height || '100%'}>
      <LinkOverlay href='' onClick={handleClick}>
        <>{props.children}</>
      </LinkOverlay>
    </LinkBox>
  );
};

export default Clickable;
