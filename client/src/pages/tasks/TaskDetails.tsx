import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Avatar,
  Button,
  Divider,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useGetTaskDetails, useUpdateTask } from "./hooks/queryHooks";
import { getStatusTag } from "./helpers";
import ModalComponent from "components/Modal";

const TaskDetailsPage = () => {
  const { taskId } = useParams() as { taskId: string };
  const { data } = useGetTaskDetails(taskId);

  const [status, setStatus] = useState(data?.status);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { mutate } = useUpdateTask();

  const handleTaskUpdate = () => {
    mutate([taskId, { status }]);
    onClose();
  };

  return (
    <Box p={8} maxWidth={800}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="xl">Task Details</Heading>
        {getStatusTag(data?.status)}
      </Flex>

      <Box bg="white" shadow="md" rounded="lg" p={6}>
        <Text fontSize="xl" fontWeight="semibold" mb={2}>
          {data?.name}
        </Text>
        <Text fontSize="md">{data?.description}</Text>
      </Box>

      <Divider my={6} />

      <Flex align="center">
        <Avatar
          size="md"
          name={`${data?.assignedTo?.firstName} ${data?.assignedTo?.lastName}`}
          mr={3}
          bg="light.blue"
          color="white"
        />
        <Box>
          <Text fontSize="lg" fontWeight="medium">
            Assigned to
          </Text>
          <Text fontSize="md" color="gray.600">
            {`${data?.assignedTo?.firstName} ${data?.assignedTo?.lastName}`}
          </Text>
        </Box>
      </Flex>

      <Button mt={8} variant="primary" size="lg" width="100%" onClick={onOpen}>
        Update Task Status
      </Button>
      <ModalComponent
        title="Update Task Status"
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        button={
          <Button
            variant="secondary"
            onClick={handleTaskUpdate}
            type="submit"
            size="sm"
          >
            Submit
          </Button>
        }
      >
        <form onSubmit={handleTaskUpdate}>
          <FormControl id="status">
            <FormLabel>Status</FormLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </Select>
          </FormControl>
        </form>
      </ModalComponent>
    </Box>
  );
};

export default TaskDetailsPage;
