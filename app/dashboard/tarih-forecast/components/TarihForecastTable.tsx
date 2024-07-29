import React from "react";
import { Center, Loader, Table } from "@mantine/core";
import { ITableValue } from "@/app/services/stpRmForKlasik/useGetStpRmForKlasik2";
import moment from "moment";

interface TarihForecastTableProps {
  data: ITableValue[] | undefined;
  isLoading: boolean;
  refreshResults: () => void;
}

const TarihForecastTable = ({
  data,
  isLoading,
  refreshResults,
}: TarihForecastTableProps) => {
  //Table rows
  const rows = data?.map((r: ITableValue, index: number) => (
    <Table.Tr key={index} style={{ overflowX: "hidden" }}>
      <Table.Td>{moment(r?.Tarih).format("DD MMM YYYY")}</Table.Td>
      <Table.Td>{r?.Mevcut}</Table.Td>
      <Table.Td>{r?.Oda}</Table.Td>
      <Table.Td>{r?.Yetişkin}</Table.Td>
      <Table.Td>{r?.Çocuk}</Table.Td>
      <Table.Td>{r?.Free}</Table.Td>
      <Table.Td>{r?.["Toplam Kişi"]}</Table.Td>
      <Table.Td>{r?.Pax}</Table.Td>
      <Table.Td>{r?.["Yuzde%(Net)"]}</Table.Td>
      <Table.Td>{r?.["Yuzde%(Sondurum)"]}</Table.Td>
      <Table.Td>{r?.["Package Tutar"]}</Table.Td>
      <Table.Td>{r?.["Gun Tarih"]}</Table.Td>
      <Table.Td>{r?.["Pax(Y/C2)"]}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading) {
    return (
      <Center w="100%" p={20}>
        <Loader size="sm" />
      </Center>
    );
  }

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table
        highlightOnHover
        striped
        stickyHeader
        stickyHeaderOffset={0}
        verticalSpacing="sm"
      >
        <Table.Thead py={12}>
          <Table.Tr>
            <Table.Th>Tarih</Table.Th>
            <Table.Th>Mevcut</Table.Th>
            <Table.Th>Oda</Table.Th>
            <Table.Th>Yetişkin</Table.Th>
            <Table.Th>Çocuk</Table.Th>
            <Table.Th>Free</Table.Th>
            <Table.Th>Toplam Kişi</Table.Th>
            <Table.Th>Pax</Table.Th>
            <Table.Th>Yuzde%(Net)</Table.Th>
            <Table.Th>Yuzde%(Sondurum)</Table.Th>
            <Table.Th>Package Tutar</Table.Th>
            <Table.Th>Gun Tarih</Table.Th>
            <Table.Th>Pax(Y/C2)</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};

export default TarihForecastTable;
