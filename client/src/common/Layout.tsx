import React, { ReactNode } from 'react';
import NavBar from './NavBar';
import { ColorModeProvider } from "@chakra-ui/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <ColorModeProvider>
        <NavBar />
        <div>{children}</div>
      </ColorModeProvider>
    </>
  );
};

export default Layout;
