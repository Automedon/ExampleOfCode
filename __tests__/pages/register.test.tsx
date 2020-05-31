import renderer from "react-test-renderer";
import React from "react";
import Register from "../../pages/register";

describe("Snapshot register page", () => {
  it("register renders correctly", () => {
    const tree = renderer.create(<Register />);
    expect(tree).toMatchSnapshot();
  });
});
