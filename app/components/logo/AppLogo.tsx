import { Flex } from "@mantine/core";
import Image from "next/image";
import React from "react";

interface AppLogoProps {
  width: number;
  height: number;
}

const AppLogo = ({ width, height }: AppLogoProps) => {
  return (
    <Flex align="center" justify="center">
      <Image
        src={require("../../../public/rmos_logo.png")}
        alt="app-logo"
        width={width}
        height={height}
      />
    </Flex>
  );
};

export default AppLogo;
