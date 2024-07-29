"use client";

import {
  ActionIcon,
  Badge,
  Button,
  Modal,
  Paper,
  TextInput,
  createTheme,
} from "@mantine/core";

export const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: "2rem",
        lineHeight: "2.0",
        fontWeight: "bolder",
      },
      h2: {
        fontSize: "1.8rem",
        fontWeight: "900",
      },
      h3: {
        fontWeight: "900",
      },
    },
  },
  fontSizes: {
    xs: "0.6875rem",
    sm: "0.875rem",
    md: "0.950rem",
    lg: "1.0rem",
    xl: "1.125rem",
  },
  colors: {
    brand: [
      "#d9e7ef",
      "#97B7CC",
      "#6CA1BD",
      "#428BAE",
      "#2F738E",
      "#00658B",
      "#005376",
      "#004161",
      "#00304C",
      "#001F37",
    ],
  },
  primaryColor: "brand",
  components: {
    Badge: Badge.extend({
      styles: {
        label: { textTransform: "capitalize", fontWeight: "normal" },
      },
    }),
    Paper: Paper.extend({
      styles: {
        root: {
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
      },
    }),
    TextInput: TextInput.extend({
      styles: {
        label: {
          fontWeight: "normal",
        },
      },
    }),
    Modal: Modal.extend({
      styles: {
        title: {
          fontWeight: "bold",
        },
      },
    }),
    Button: Button.extend({
      styles: {
        root: {
          overflow: "visible",
        },
      },
    }),
  },
});
