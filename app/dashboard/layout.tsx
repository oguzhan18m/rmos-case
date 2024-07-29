"use client";

import React from "react";
import {
  Burger,
  Flex,
  Group,
  LoadingOverlay,
  AppShell as MantineAppShell,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { IconGraph, IconUsersGroup } from "@tabler/icons-react";
import AppLogo from "../components/logo/AppLogo";
import UserMenu from "../components/layout/UserMenu";

export interface AppShellProps {
  children: React.ReactNode;
}

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  // Hooks
  const router = useRouter();
  const pathName = usePathname();
  const { colors } = useMantineTheme();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  // States
  const [isPrepareLoading, setIsPrepareLoading] = React.useState(false);

  // Routes
  const routes = [
    {
      name: "Tarih Forecast",
      path: "/dashboard/tarih-forecast",
      icon: (
        <IconGraph
          size={18}
          color={
            pathName == "/dashboard/tarih-forecast"
              ? colors.brand[5]
              : colors.dark[2]
          }
        />
      ),
    },
    {
      name: "Kara Liste",
      path: `/dashboard/blacklist`,
      icon: (
        <IconUsersGroup
          size={18}
          color={
            pathName == `/dashboard/blacklist`
              ? colors.brand[5]
              : colors.dark[2]
          }
        />
      ),
    },
  ];

  // Loading
  if (isPrepareLoading) {
    return <LoadingOverlay />;
  }

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <MantineAppShell.Header>
        <Flex
          px={"md"}
          w="100%"
          h="100%"
          align="center"
          justify="space-between"
        >
          <Group h="100%">
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              color="dimmed"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
              color="dimmed"
            />
            <AppLogo width={88} height={42} />
          </Group>
          <UserMenu />
        </Flex>
      </MantineAppShell.Header>
      <MantineAppShell.Navbar py="md" px={8}>
        {routes.map(({ name, path, icon }) => (
          <UnstyledButton
            key={path}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderRadius: 10,
            }}
            bg={
              pathName.includes(path?.split("?")?.[0])
                ? colors.brand[0]
                : "transparent"
            }
            onClick={() => {
              router.push(path);
              toggleMobile();
            }}
          >
            {icon}
            <Text
              c={
                pathName.includes(path?.split("?")?.[0])
                  ? colors.brand?.[5]
                  : colors.dark[6]
              }
              size="sm"
              ml={8}
              fw={pathName.includes(path?.split("?")?.[0]) ? "600" : "normal"}
            >
              {name}
            </Text>
          </UnstyledButton>
        ))}
      </MantineAppShell.Navbar>
      <MantineAppShell.Main
        style={{
          backgroundColor: "#f7f9fd",
        }}
      >
        {children}
      </MantineAppShell.Main>
    </MantineAppShell>
  );
}

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
