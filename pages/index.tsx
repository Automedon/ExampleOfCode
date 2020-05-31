import React from "react";
import withApollo from "../lib/withApollo";
import Link from "next/link";
import { NextPageContext } from "next";
import { checkLoginServerRender } from "../lib/serverFunctions";
import { Button } from "@material-ui/core";
import Layout from "../components/Layout/Layout";

const Index = () => {
  return (
    <div>
      <p>A simple example repo</p>
      <Button variant="outlined" color="primary">
        <Link href="/register">
          <a>Register</a>
        </Link>
      </Button>
      <br />
      <Button variant="outlined" color="primary">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Button>
    </div>
  );
};

Index.getInitialProps = (ctx: NextPageContext) => {
  checkLoginServerRender(ctx);
};

export const TestingIndex = Index;

export default withApollo(Index);
