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

const DepartmentDetails = () => { const { taskId } = useParams() as { taskId: string };
  // const { data } = useGetTaskDetails(taskId);
 
  // const [status, setStatus] = useState(data?.status);
  const { isOpen, onClose, onOpen } = useDisclosure();
  // const { mutate } = useUpdateTask();

  // const handleTaskUpdate = () => {
  //   mutate([taskId, { status }]);
  //   onClose();
  // };

  return (
    <Box p={8} maxWidth={800}>
      This is the department details page
    </Box>
  );
};

export default DepartmentDetails;
