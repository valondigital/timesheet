import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser } from "react-icons/fi";

const Hamburger = () => {
  const user = JSON.parse(localStorage.user);
  const username = `${user.firstName} ${user.lastName}`;
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("expireTime");
    navigate("/login");
  };
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Box display="flex" alignItems="center">
          <Avatar src={user.imgUrl ?? "https://bit.ly/sage-adebayo"} mr={4} />
          {username}
        </Box>
      </MenuButton>
      <MenuList>
        <MenuItem minH="48px" onClick={() => navigate('/profile')}>
          <Icon as={FiUser} mr={4} />
          <span>Profile</span>
        </MenuItem>
        <MenuItem minH="48px">
          <Icon as={FiUser} mr={4} />
          <span>Reset Password</span>
        </MenuItem>
        <MenuItem minH="40px" onClick={handleLogOut}>
          <Icon as={FiLogOut} mr={4} />
          <span>Log Out</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Hamburger;
