import { Button, Flex } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import React from "react";
import { useSignOut } from "@/app/hooks/useSignOut";

const UserMenu = () => {
  const { signOut } = useSignOut();

  return (
    <Flex direction="row" align="center">
      <Button
        c={"white"}
        bg={"red"}
        variant="filled"
        leftSection={<IconLogout />}
        onClick={async () => await signOut()}
      >
        Çıkış yap
      </Button>
    </Flex>
  );
};

export default UserMenu;
