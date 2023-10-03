import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  FormHelperText,
  Box,
  Button,
  GridItem,
  Textarea,
} from "@chakra-ui/react";

const generateGridInputs = (inputObj) => {
  if (
    inputObj.type === "email" ||
    inputObj.type === "text" ||
    inputObj.type === "phone" ||
    inputObj.type === "number" ||
    inputObj.type === "date"
  ) {
    return (
      <GridItem>
        <FormControl isInvalid={inputObj.isInvalid} mb={3} key={inputObj.name}>
          <FormLabel htmlFor={inputObj.name} mb={0}>
            {inputObj.label}
          </FormLabel>
          <Input
            id={inputObj.name}
            type={inputObj.type}
            value={inputObj?.value}
            {...inputObj.register}
            size={["sm", `${inputObj.size ?? "md"}`]}
            placeholder={inputObj?.placeholder}
            onChange={inputObj?.onChange}
            defaultValue={inputObj?.defaultValue}
            disabled={inputObj?.disabled}
            key={inputObj.type}
          />

          {inputObj.buttons?.map((button) => {
            return button.asButton ? (
              <Button variant="primary" ml={4}>
                {button.icon}
              </Button>
            ) : (
              button.icon
            );
          })}
          {inputObj.error && (
            <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
          )}
          {inputObj.helperMessage && (
            <FormHelperText>{inputObj.helperMessage}</FormHelperText>
          )}
        </FormControl>
      </GridItem>
    );
  } else if (
    inputObj.type === "select" &&
    inputObj.variant !== "outline-select"
  ) {
    return (
      <GridItem>
        <FormControl isInvalid={inputObj.isInvalid} mb={4} key={inputObj.name}>
          <FormLabel mb={0} htmlFor={inputObj.name}>
            {inputObj.label}
          </FormLabel>
          <Select
            id={inputObj.name}
            size={inputObj.size ?? "md"}
            {...inputObj.register}
            focusBorderColor="primary"
            onChange={inputObj?.onChange}
            disabled={inputObj?.disabled}
            defaultValue={inputObj?.defaultValue}
            width={inputObj?.width}
            ml={inputObj.float ? "auto" : ""}
          >
            {inputObj?.options?.map((item) => {
              return (
                <option
                  value={item.value}
                  key={item.key}
                  style={{ color: "#000" }}
                >
                  {item.name}
                </option>
              );
            })}
          </Select>
          {inputObj.error && (
            <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
          )}
        </FormControl>
      </GridItem>
    );
  } else if ((inputObj.type = "textarea")) {
    return (
      <GridItem colSpan={3}>
        <FormControl isInvalid={inputObj.isInvalid} mb={3} key={inputObj.name}>
          <FormLabel htmlFor={inputObj.name} mb={0}>
            {inputObj.label}
          </FormLabel>
          <Textarea
            onChange={inputObj?.onChange}
            value={inputObj?.value}
            id={inputObj.name}
            {...inputObj.register}
            size={["sm", `${inputObj.size ?? "md"}`]}
            placeholder={inputObj?.placeholder}
            defaultValue={inputObj?.defaultValue}
            disabled={inputObj?.disabled}
            key={inputObj.type}
          />
          {inputObj.buttons?.map((button) => {
            return button.asButton ? (
              <Button variant="primary" ml={4}>
                {button.icon}
              </Button>
            ) : (
              button.icon
            );
          })}
          {inputObj.error && (
            <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
          )}
          {inputObj.helperMessage && (
            <FormHelperText>{inputObj.helperMessage}</FormHelperText>
          )}
        </FormControl>
      </GridItem>
    );
  } else if (
    inputObj.type === "select" &&
    inputObj.variant === "outline-select"
  ) {
    return (
      <GridItem>
        <FormControl isInvalid={inputObj.isInvalid} mb={4} key={inputObj.name}>
          <Box display="inline-block" position="relative">
            <Select
              placeholder={inputObj.icon ? inputObj.icon : inputObj.label}
              borderBottom="none"
              icon={inputObj.icon}
              borderTop={inputObj.icon ? "1px solid black" : "none"}
              id={inputObj.name}
              size={inputObj.size ?? "md"}
              {...inputObj.register}
              focusBorderColor="primary"
              onChange={inputObj?.onChange}
              disabled={inputObj?.disabled}
              defaultValue={inputObj?.defaultValue}
              width={inputObj?.width}
              ml={inputObj.float ? "auto" : ""}
              _focus={{ boxShadow: "none", border: "none" }}
              _hover={{ boxShadow: "none" }}
            >
              {inputObj?.options?.map((item) => {
                return (
                  <option
                    value={item.value}
                    key={item.name}
                    style={{ color: "#000" }}
                  >
                    {item.name}
                  </option>
                );
              })}
            </Select>
            {inputObj.error && (
              <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
            )}
            <Box
              position="absolute"
              top="50%"
              right="0"
              transform="translateY(-50%)"
              pointerEvents="none"
            ></Box>
          </Box>
        </FormControl>
      </GridItem>
    );
  }
};

export default generateGridInputs;
