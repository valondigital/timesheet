import { useEffect } from "react";
import { Flex, Button, Box, FormLabel } from "@chakra-ui/react";
import generateInputs from "./DynamicForm";
import underscore from "underscore";


type ButtonProps = {
  name: string;
  size?: string;
  onClick: () => void;
};


const TableTop = ({
  inputObj,
  buttons,
  onChange,
}: {
  inputObj: InputObj[];
  buttons?: ButtonProps[] | false; // Updated type definition here
  onChange: (name: string, value: string | Record<string, Date>) => void;
}) => {
  const debouncedOnChange = underscore.debounce(onChange, 1000);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const onClick = (buttonName: string) => {
    if (Array.isArray(buttons)) {
      const matchedButton = buttons.find((button) => button.name === buttonName);
      if (matchedButton) {
        matchedButton.onClick();
      }
    }
  };
  
  return (
    <Flex mb={2} bgColor="gray.50" mt={4} p={3} flexWrap="wrap">
      {inputObj.map((input) => (
        <Box
          key={input.name}
          mr={2}
          flexBasis={`${
            inputObj.length > 3 ? "24" : 100 / inputObj.length - 2
          }%`}
        >
          {generateInputs({
            ...input,
            onChange: (value: any) => {
              if (value?.target) {
                return debouncedOnChange(input?.name, value.target.value);
              } else {
                return debouncedOnChange(input?.name, value);
              }
            },
          })}
        </Box>
      ))}
    
      {buttons !== false && buttons?.map((button: ButtonProps) => (
        <Box key={button.name}>
          <FormLabel visibility="hidden" mb={0}>
            {button.name}
          </FormLabel>
          <Button variant="secondary" onClick={() => onClick(button.name)} size={button.size ?? "md"}>{button.name}</Button>
        </Box>
      ))}
    </Flex>
  );
};

export default TableTop;
