import {
  Box,
  Grid,
  GridItem,
  Textarea,
  Text,
  Badge,
  Flex,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import ModalComponent from "components/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import generateGridInputs from "./components/GridForm";
import LeaveDetailsHeader from "./components/Jumbotron";
import { inputObjList, statusTypes } from "./helpers";
import { useGetLeaveDetails, useUpdateLeaveStatus } from "./hooks/queryHooks";

const LeaveDetails = () => {
  const { leaveId } = useParams() as { leaveId: string };
  const { data: leave } = useGetLeaveDetails(leaveId);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [status, setStatus] = useState("approved");
  const { mutate } = useUpdateLeaveStatus();
  const user = JSON.parse(localStorage.user);

  const isAdminOrHod = () => {
    return user.role === "admin" || user.role === "hod";
  };

  const handleLeaveUpdate = () => {
    mutate([leaveId, { status }]);
    onClose();
  };

  if (leave) {
    return (
      <>
        <LeaveDetailsHeader />
        <Box bg="white" shadow="md" rounded="lg" p={6}>
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {inputObjList(leave).map((input) => generateGridInputs(input))}
          </Grid>
          <Grid templateColumns="repeat(5, 1fr)" mt={8}>
            <GridItem>
              <Text fontSize="lg" fontWeight="semibold">
                Leave Reason
              </Text>
            </GridItem>
            <GridItem colSpan={4}>
              <Textarea value={leave?.reason} size="lg" />
            </GridItem>
          </Grid>
          <Flex justifyContent="space-between" my={8} maxWidth="60%">
            <Text fontSize="md">
              <strong>Leave Status From HOD</strong>{" "}
              <Badge
                colorScheme={
                  leave.hodApproval?.status === "approved" ? "green" : "red"
                }
              >
                {leave.hodApproval?.status}
              </Badge>
            </Text>
            <Text fontSize="md" fontWeight="medium">
              <strong>Admin Approval:</strong>{" "}
              <Badge
                colorScheme={
                  leave.adminApproval?.status === "approved" ? "green" : "red"
                }
              >
                {leave.adminApproval?.status}
              </Badge>
            </Text>
            {isAdminOrHod() && (
              <Button variant="primary" size="sm" onClick={onOpen}>
                Take Action
              </Button>
            )}
          </Flex>
          <ModalComponent
            title="Update Leave Application Status"
            isOpen={isOpen}
            onClose={onClose}
            size="md"
            button={
              <Button
                variant="secondary"
                onClick={handleLeaveUpdate}
                type="submit"
                size="sm"
              >
                Submit
              </Button>
            }
          >
            <form onSubmit={handleLeaveUpdate}>
              <FormControl id="status">
                <FormLabel>Status</FormLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusTypes.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </Select>
              </FormControl>
            </form>
          </ModalComponent>
        </Box>
      </>
    );
  }
  return <Box>Loading....</Box>;
};

export default LeaveDetails;
