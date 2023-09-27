import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styled from 'styled-components'

import breakPoints from "../utils/breakPoints";
import Hamburger from "./Hamburger";
import paths from "./paths";

const PageHeader = (props: { title: string }) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  useEffect(() => {
    const currentPage = Object.keys(paths).find(
      (key) => paths[key] === location.pathname
    );
    if (currentPage) {
      setPageTitle(currentPage);
    }
  }, [location.pathname]);
  const [isLargerThan1500] = useMediaQuery(breakPoints.laptopL);


  return (
    <StyledBox>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p={4}
        // pl={isLargerThan1500 ? 20 : 10}
        bgColor="white"
      >
        <Text variant="whiteBoldNormal" color="light.primary">
          {pageTitle.replace(/^\w/, (c) => c.toUpperCase())}
        </Text>
        <HStack align="center">
          <Hamburger/>
        </HStack>
      </Flex>
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;
export default PageHeader;
