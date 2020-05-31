import React from "react";
import Link from "next/link";

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <div>
        <Link href="/">
          <a>Home Page</a>
        </Link>
      </div>
    </div>
  );
};
