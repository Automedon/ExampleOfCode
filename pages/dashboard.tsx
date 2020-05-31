import React from "react";
import withApollo from "../lib/withApollo";
import DashBoardList from "../components/Dashboard/DashBoardList";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <h1 style={{ textAlign: "center" }}>Automedon CarYard</h1>
      <DashBoardList />
    </div>
  );
};

export const TestingDashboard = Dashboard;
export default withApollo(Dashboard);
