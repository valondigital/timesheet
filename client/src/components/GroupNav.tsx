import {
  useDisclosure,
  Text,
  Link,
  Collapse,
  Box,
  HStack,
  Icon,
  Flex,
} from "@chakra-ui/react";
import Clickable from "./Clickable";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import NavMole from "./NavMole";
import { NavLink } from "react-router-dom";
import { VscTriangleDown, VscTriangleRight } from "react-icons/vsc";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiChevronsUp } from "react-icons/fi";
import { BiChevronUp } from "react-icons/bi";

type Props = {
  sub: SubNav[];
  main: { name: string; icon: React.ReactNode };
};

const GroupNav = (props: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  const navs = props.sub.map((item) => <SingleNav {...item} key={item.path} />);

  return (
    <Box mb={3}>
      <Clickable height="auto" onClick={onToggle}>
        <HStack mb={2} ml={2}>
          {props.main.icon}
          <Text variant="nav" color="light.text">
            {props.main.name}
          </Text>
          {isOpen ? (
            <ChevronDownIcon fontSize={24} color="white" />
          ) : (
            <BiChevronUp fontSize={24} color="white" />
          )}
        </HStack>
      </Clickable>
      <HStack ml={2}>
        <Collapse in={isOpen} animateOpacity>
          {navs}
        </Collapse>
      </HStack>
    </Box>
  );
};

export const SingleNav = ({
  path,
  name,
  icon,
}: {
  path: string;
  name: string;
  icon: React.ReactNode;
}) => {
  const { pathname } = useLocation();

  return (
    <Link
      as={ReactRouterLink}
      to={path}
      p={4}
      bg={pathname === path ? "light.secondary" : ""}
      px={2}
    >
      <Flex align="center">
        {icon}
        {/* <Icon
          as={icon}
          boxSize={6}
          // color={pathname === item.route ? "dark.text" : "light.text"}
          color="light.text"
        /> */}
        <Text
          ml={2}
          // color={pathname === item.route ? "dark.text" : "light.text"}
          color="light.text"
          variant="nav"
        >
          {name}
        </Text>
      </Flex>
    </Link>
  );
};

export default GroupNav;
