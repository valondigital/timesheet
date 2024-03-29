import {
  Box,
  Flex,
  Image,
} from "@chakra-ui/react";
import  { pathObject } from "./paths";
import { useUserDetailsContext } from "setup/app-context-manager/UserDetailsContext";
import logo from "assets/brand/logo-white.png";
import GroupNav, { SingleNav } from "./GroupNav";

const Sidebar = () => {
  const { userDetails } = useUserDetailsContext();

  const filteredPaths = pathObject.filter((item) => {
    return (
      userDetails.role === "admin" ||
      userDetails.role === "super-admin" ||
      userDetails.role === "project-manager" ||
      userDetails.role === "hod" ||
      ![
        "Users",
        "Clients",
        "Projects",
        "All Tasks",
        "Clock In Statistics",
        "All leave",
        "Add Public Holiday",
      ].includes(item.main.name)
    );
  });

  const navs = filteredPaths.map((item) =>
    item.sub.length ? (
      <GroupNav {...item} key={item.main.name} />
    ) : (
      <SingleNav
        path={item.main.path || ""}
        name={item.main.name}
        icon={item.main.icon}
        key={item.main.name}
      />
    )
  );

  return (
    <Box py={4}>
      <Box height="10vh" mb={4}>
        <Image src={logo} height="100%" width="60%" />
      </Box>
      <Box
        height="70vh"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray.400",
            borderRadius: "full",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent"

          },
        }}
      >
        <Flex direction="column">{navs}</Flex>
      </Box>
    </Box>
  );
};

export default Sidebar;
