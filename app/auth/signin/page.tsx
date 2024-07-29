"use client";

import React from "react";
import { Center, Grid } from "@mantine/core";
import SignInForm from "./components/SigninForm";

const SigninPage = () => {
  return (
    <Grid style={{ background: "#f9f9f9", position: "relative" }}>
      <Grid.Col
        span={{ base: 12, md: 6 }}
        style={{ display: "block", margin: "auto" }}
      >
        <Center
          p={{ xs: "lg", md: "xs" }}
          style={{
            alignContent: "center",
            justifyContent: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <SignInForm />
        </Center>
      </Grid.Col>
    </Grid>
  );
};

export default SigninPage;
