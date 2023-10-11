import { useEffect, useState } from "react";
import ModalComponent from "components/Modal";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import Sidebar from "./SideBar";
import PageScaffold from "./PageScaffold";
import { useQueryClient } from "@tanstack/react-query";
import paths from "./paths";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [count, setCount] = useState(15);
  const [hasCheckedInactivity, setHasCheckedInactivity] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const handleLogout =() => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('userId');
    queryClient.cancelQueries();
    queryClient.clear();
    navigate(paths.login);
  }

  useEffect(() => {
    if (!hasCheckedInactivity) {
      // If inactivity has not been checked, run the check
      checkForInactivity();
      setHasCheckedInactivity(true);
    }
  }, [hasCheckedInactivity]);

  const checkForInactivity = () => {
    const expireTime = Number(localStorage.getItem("expireTime"));
    if (expireTime < Date.now()) {
      onOpen();
    }
  };

  const updateExpireTime = () => {
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + 5000;
    localStorage.setItem("expireTime", expirationTime.toString());
  };

  useEffect(() => {
    updateExpireTime();
    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkForInactivity();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasCheckedInactivity) {
      const timer = setInterval(() => {
        setCount((count) => count - 1);
        if (count === 0) {
          clearInterval(timer);
          onClose();
          handleLogout()
          setHasCheckedInactivity(false)
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [count, onClose, hasCheckedInactivity]);

  return (
    <>
      <Flex>
        <Box bg="light.blue" w="15vw" minH="100vh" position="fixed">
          <Sidebar />
        </Box>
        <Flex direction="column" ml="15vw" w="100%">
          <Box bg="gray.200" flex="1">
            <PageScaffold title="scaffold">
              <Outlet />
            </PageScaffold>
          </Box>
        </Flex>
      </Flex>
      <ModalComponent
        isOpen={isOpen}
        onClose={onClose}
        button={
          <Stack direction="row" spacing={4} align="center">
            <Button onClick={handleLogout} type="submit" variant="primary" bg="red">
              Log Out
            </Button>
            <Button
              onClick={onClose}
              type="submit"
              variant="primary"
              bg="green"
            >
              I'm still here({count})
            </Button>
          </Stack>
        }
      >
        <Heading variant="primary" fontSize="24px" mb={4}>
          Session Timeout
        </Heading>
        <br />
        <Text variant="faqAnswer">
          You're being timedout due to inactivity. Please choose to stay signed
          in or to logout
        </Text>
      </ModalComponent>
    </>
  );
};

export default Layout;
