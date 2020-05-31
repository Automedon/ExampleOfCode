import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import React from "react";
import { TestingLoginPage } from "../../pages/login";

describe("Snapshot TestingLoginPage page", () => {
  it("TestingLoginPage renders correctly", () => {
    const tree = shallow(<TestingLoginPage />);
    expect(tree).toMatchSnapshot();
  });
});
