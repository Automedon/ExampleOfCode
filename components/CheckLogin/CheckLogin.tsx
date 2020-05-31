import React from "react";
import { tokenOnClient } from "../../lib/browserFunctions";
import Link from "next/link";
import { Button } from "@material-ui/core";

interface CheckLoginProps {
  children: React.ReactNode;
}

const CheckLogin = ({ children }: CheckLoginProps) => {
  if (!tokenOnClient) {
    return (
      <div style={{ textAlign: "center" }}>
        <Link href="/login">
          <a>
            <Button variant="outlined" color="primary">
              Go to Login
            </Button>
          </a>
        </Link>
        <br />
        ***Here is a content you need to be logged to see it***
      </div>
    );
  }
  return <>{children}</>;
};

export default CheckLogin;
