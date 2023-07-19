import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Info } from 'components/Info';
import { useParams } from 'react-router-dom';
import { useGetLogDetails, useUpdateLog } from './hooks/queryHooks';

const ClockOut = () => {
  const { logId } = useParams() as { logId: string };
  const [totalTime, setTotalTime] = useState(0);
  const [timeSpentPerTask, setTimeSpentPerTask] = useState<{
    [taskId: string]: number;
  }>({});
  const { data, isLoading } = useGetLogDetails(logId);
  const { mutate: updateLog, isLoading: updateLogLoading } = useUpdateLog();

  const handleChange = (taskId: string, value: string) => {
    const timeSpent = parseInt(value, 10); // Convert value to a number using parseInt
    setTimeSpentPerTask((prev) => ({ ...prev, [taskId]: timeSpent }));
  };

  const handleSubmit = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    const payload = { workHours: totalTime, checkOut: formattedDate };
    updateLog([logId, payload])
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
          {data?.log?.tasks?.map((item) => (
            <UnorderedList mb={8}>
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
          <Button
            variant="secondary"
            isDisabled={totalTime !== 8}
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
