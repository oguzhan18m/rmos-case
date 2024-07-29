import React from "react";
import { Flex, Text, Title } from "@mantine/core";

interface TarihForecastTableHeaderProps {}

export default function TarihForecastTableHeader({}: TarihForecastTableHeaderProps) {
  return (
    <Flex direction="column" px={12} mb={12}>
      <Flex direction="row" align="center" justify="space-between">
        <Title fw={"900"} order={1}>
          Tarih Forecast
        </Title>
      </Flex>
      <Text size="sm" c={"dimmed"}>
        Tarih forecast tablosu aşağıda listelenmiştir.
      </Text>
    </Flex>
  );
}
