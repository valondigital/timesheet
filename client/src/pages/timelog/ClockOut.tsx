import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  ListItem,
  UnorderedList,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
} from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { Info } from "components/Info";
import { useParams } from "react-router-dom";
import { useGetLogDetails, useUpdateLog } from "./hooks/queryHooks";
import { areDatesOnSameDay } from "./helpers";
import { formatDate, formatDateTwo } from "./../../utils/formatDate";

const ClockOut = () => {
  const { logId } = useParams() as { logId: string };
  const [totalTime, setTotalTime] = useState(0);
  const [note, setNote] = useState("");
  const [timeSpentPerTask, setTimeSpentPerTask] = useState<{
    [taskId: string]: number;
  }>({});
  const { data } = useGetLogDetails(logId);
  const { mutate: updateLog } = useUpdateLog();
  const answer = areDatesOnSameDay(data?.log?.checkIn);

  const handleChange = (taskId: string, value: string) => {
    const timeSpent = parseInt(value, 10); // Convert value to a number using parseInt
    setTimeSpentPerTask((prev) => ({ ...prev, [taskId]: timeSpent }));
  };

  const handleSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const payload = { workHours: totalTime, checkOut: formattedDate, note };
    updateLog([logId, payload]);
  };

  useEffect(() => {
    if (data?.log?.tasks) {
      const total = Object.values(timeSpentPerTask).reduce(
        (acc, value) => acc + value,
        0
      );
      setTotalTime(total);
    }
  }, [timeSpentPerTask]);

  return (
    <Box>
      <Info>
        Please allocate the time spent for each of the tasks you worked on
      </Info>
      <Box mt={8} maxW="50%">
        <form>
          {data?.log?.tasks?.map((item, idx) => (
            <UnorderedList mb={8} key={idx}>
              <ListItem>
                <Flex>
                  <FormControl>
                    <FormLabel>{item.name}</FormLabel>
                  </FormControl>
                  <FormControl>
                    <NumberInput
                      defaultValue={0}
                      min={0}
                      max={8}
                      onChange={(value) => handleChange(item._id, value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </Flex>
              </ListItem>
            </UnorderedList>
          ))}
          {!answer && (
            <Box mb={8}>
              <FormControl>
                <FormLabel>
                  Please state why you forgot to clock out on{" "}
                  {formatDateTwo(data?.log?.checkIn)}
                </FormLabel>
                <Textarea
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
              </FormControl>
            </Box>
          )}
          <Button
            variant="secondary"
            isDisabled={!answer ? totalTime !== 8 || note.trim() === "" :  totalTime !== 8}
            onClick={handleSubmit}
          >
            Clock Out
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default ClockOut;
