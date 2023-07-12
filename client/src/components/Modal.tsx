
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter
} from '@chakra-ui/react'


type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void,
  button?: JSX.Element,
  size?: string
}
function ModalComponent(props : Props) {
  return (
      <Modal size={props?.size ?? 'md'} isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody maxH='70vh' overflow='auto'>
              {props.children}
          </ModalBody>
          <ModalFooter>
          {props.button}
        </ModalFooter>
        </ModalContent>
        
      </Modal>
  )
}

export default ModalComponent;