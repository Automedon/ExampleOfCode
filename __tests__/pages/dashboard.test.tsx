import renderer from "react-test-renderer";
import React from "react";
import { TestingDashboard } from "../../pages/dashboard";

describe("Snapshot TestingDashboard page", () => {
  it("TestingDashboard renders correctly", () => {
    const tree = renderer.create(<TestingDashboard />);
    expect(tree).toMatchSnapshot();
  });
});
