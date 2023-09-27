import { Grid, GridItem, Heading, Image, Text, VStack } from "@chakra-ui/react";
import banner from "assets/images/banner.png";

const WelcomeCard = () => {
  const user = JSON.parse(localStorage.user);
  const username = `${user.firstName} ${user.lastName}`;
  return (
    <Grid templateColumns="repeat(4, 1fr)" bg="white" p={4} borderRadius={10} mb={4}>
      <GridItem colSpan={1}>
        <Image src={banner} />
      </GridItem>
      <GridItem colSpan={2} pl={8}>
        <VStack alignItems="start" justifyContent="center" height="100%">
          <Text>Welcome Back</Text>
          <Heading variant="tertiary" color="textLight" mb={2}>
            {username}
          </Heading>
          <p>
            you are in an organisation established to serve the wider
            community in USA and Africa.
          </p>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default WelcomeCard;
