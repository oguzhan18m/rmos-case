import React from "react";
import { Button, Flex, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface BlackListTableHeaderProps {
  setModalType: (value: "update" | "create") => void;
  setIsBlackInfoModalOpen: (value: boolean) => void;
}

export default function BlackListTableHeader({
  setModalType,
  setIsBlackInfoModalOpen,
}: BlackListTableHeaderProps) {
  const handleOpenModal = () => {
    setIsBlackInfoModalOpen(true);
    setModalType("create");
  };
  return (
    <Flex direction="column" px={12} mb={12}>
      <Flex direction="row" align="center" justify="space-between">
        <Title fw={"900"} order={1}>
          Kara Liste
        </Title>
        <Button onClick={handleOpenModal} leftSection={<IconPlus />}>
          Kişi Kaydı
        </Button>
      </Flex>
      <Text size="sm" c={"dimmed"}>
        Kara listeye alınan kişiler aşağıda listelenmiştir
      </Text>
    </Flex>
  );
}
