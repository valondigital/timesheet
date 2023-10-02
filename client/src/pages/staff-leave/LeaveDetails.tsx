import {
  Box,
  Grid,
  GridItem,
  Textarea,
  Text,
  Badge,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import generateGridInputs from "./components/GridForm";
import LeaveDetailsHeader from "./components/Jumbotron";
import { inputObjList } from "./helpers";
import { useGetLeaveDetails } from "./hooks/queryHooks";

const LeaveDetails = () => {
  const { leaveId } = useParams() as { leaveId: string };
  const { data: leave } = useGetLeaveDetails(leaveId);

  const handleModal = () => {
    console.log("Modal button clicked!!!");
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
          <Flex justifyContent="space-between" my={8} maxWidth="50%">
            <Text>
              <strong>HOD Approval:</strong>{" "}
              <Badge
                colorScheme={
                  leave.hodApproval?.status === "approved" ? "green" : "red"
                }
              >
                {leave.hodApproval?.status}
              </Badge>
            </Text>
            <Text>
              <strong>Admin Approval:</strong>{" "}
              <Badge
                colorScheme={
                  leave.adminApproval?.status === "approved" ? "green" : "red"
                }
              >
                {leave.adminApproval?.status}
              </Badge>
            </Text>
            <Button variant="primary" size="sm" onClick={handleModal}>
              Take Action
            </Button>
          </Flex>
          {/* <ModalComponent
            title="Create Project"
            isOpen={isOpen}
            onClose={onClose}
            button={
              <Button
                variant="secondary"
                onClick={handleSubmit(onSubmit)}
                type="submit"
                isLoading={createProjectLoading}
              >
                Submit
              </Button>
            }
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              {inputObjList(register, errors).map((input) =>
                generateInputs(input)
              )}
            </form>
          </ModalComponent> */}
        </Box>
      </>
    );
  }
  return <Box>Loading....</Box>;
};

export default LeaveDetails;
