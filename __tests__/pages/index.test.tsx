import renderer from "react-test-renderer";
import React from "react";
import { TestingIndex } from "../../pages/index";

describe("Snapshot index page", () => {
  it("index renders correctly", () => {
    const tree = renderer.create(<TestingIndex />);
    expect(tree).toMatchSnapshot();
  });
});
