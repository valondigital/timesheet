import ModalComponent from '../../../components/Modal';
import { Button } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { useGetLogDetails } from '../hooks/queryHooks';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  size?: string;
  handleSubmit: () => void;
  status?: string;
  id: string | null;
};

function ActionModal(props: Props) {
  const { title, isOpen, onClose, handleSubmit, status, id } = props;
  const { data, isLoading } = useGetLogDetails(id ?? '');
  console.log(data, id, "here is the preferred log data")



  return (
    <ModalComponent
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      button={
        <Stack direction="row" spacing={4} align="center">
          <Button onClick={handleSubmit} type="submit">
            Yes
          </Button>
          <Button onClick={onClose} type="submit">
            No
          </Button>
        </Stack>
      }
    >
      {status === 'ACTIVE' ? 'Deactivate Agent?' : 'Activate Agent?'}
    </ModalComponent>
  );
}

export default ActionModal;
