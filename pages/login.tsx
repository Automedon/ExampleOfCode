import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import Layout from "../components/Layout/Layout";
import FindUser from "../components/FindUser/FindUser";
import withApollo from "../lib/withApollo";
import Link from "next/link";
import { Button } from "@material-ui/core";

const LoginPage = () => {
  return (
    <Layout>
      <Button variant="outlined" color="primary">
        <Link href="/dashboard">
          <a>DashBoard (You can go here without login but...)</a>
        </Link>
      </Button>
      <LoginForm />
      <FindUser />
    </Layout>
  );
};

export const TestingLoginPage = LoginPage;

export default withApollo(LoginPage);
