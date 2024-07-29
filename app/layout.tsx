import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import ReactQueryProvider from "./providers/react-query-provider";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "RMOS Case",
  description: "RMOS Case Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <MantineProvider theme={theme}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
