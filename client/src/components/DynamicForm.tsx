import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
  FormHelperText,
  Stack,
  Checkbox,
  CheckboxGroup,
} from '@chakra-ui/react';
import DateRangePicker from './DateRange';

const generateInputs = (inputObj: InputObj) => {
  if (
    inputObj.type === 'email' ||
    inputObj.type === 'text' ||
    inputObj.type === 'phone' ||
    inputObj.type === 'number' ||
    inputObj.type === 'date'
  ) {
    return (
      <FormControl isInvalid={inputObj.isInvalid} mb={3} key={inputObj.name}>
        <FormLabel htmlFor={inputObj.name} mb={0}>
          {inputObj.label}
        </FormLabel>
        <Input
          id={inputObj.name}
          type={inputObj.type}
          {...inputObj.register}
          size={inputObj.size ?? 'md'}
          placeholder={inputObj?.placeholder}
          onChange={inputObj?.onChange}
          defaultValue={inputObj?.defaultValue}
          disabled={inputObj?.disabled}
          key={inputObj.type}
        />
        {inputObj.error && (
          <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
        )}
        {inputObj.helperMessage && (
          <FormHelperText>{inputObj.helperMessage}</FormHelperText>
        )}
      </FormControl>
    );
  } else if (inputObj.type === 'select') {
    return (
      <FormControl isInvalid={inputObj.isInvalid} mb={4} key={inputObj.name}>
        <FormLabel mb={0} htmlFor={inputObj.name}>
          {inputObj.label}
        </FormLabel>
        <Select
          id={inputObj.name}
          size={inputObj.size ?? 'md'}
          {...inputObj.register}
          focusBorderColor="primary"
          onChange={inputObj?.onChange}
          disabled={inputObj?.disabled}
          defaultValue={inputObj?.defaultValue}
        >
          {inputObj?.options?.map((item) => {
            return (
              <option value={item.value} key={item.name}>
                {item.name}
              </option>
            );
          })}
        </Select>
        {inputObj.error && (
          <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
        )}
      </FormControl>
    );
  } else if (inputObj.type === 'dateRange') {
    return (
      <DateRangePicker
        onChange={(dateRange) => {
          if (inputObj.onChange) {
            inputObj?.onChange(dateRange);
          }
        }}
      />
    );
  } else if (inputObj.type === 'checkbox') {
    return (
      <FormControl isInvalid={inputObj.isInvalid} mb={4} key={inputObj.name}>
        <FormLabel mb={0} htmlFor={inputObj.name}>
          {inputObj.label}
        </FormLabel>
        <CheckboxGroup>
          <Stack spacing={5} direction="column">
            {inputObj?.options?.map((item, idx) => {
              return (
                <Checkbox
                  value={item.value}
                  key={idx}
                  {...inputObj.register}
                  onChange={inputObj?.onChange}
                >
                  {item.name}
                </Checkbox>
              );
            })}
          </Stack>
        </CheckboxGroup>
        {inputObj.error && (
          <FormErrorMessage>{inputObj.error.message}</FormErrorMessage>
        )}
      </FormControl>
    );
  }
};

export default generateInputs;
