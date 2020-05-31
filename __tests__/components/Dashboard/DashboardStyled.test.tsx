import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import {
  CarInStock,
  Row,
  DisplayCarsGrid,
  FormWrapper,
  StyledSelect,
} from "../../../components/Dashboard/DashboardStyled";

describe("Styled-components Dashboard", () => {
  it("CarInStock", () => {
    const tree = renderer.create(<CarInStock available={true} />);
    expect(tree).toMatchSnapshot();
  });
  it("DisplayCarsGrid", () => {
    const tree = renderer.create(<DisplayCarsGrid />);
    expect(tree).toMatchSnapshot();
  });
  it("FormWrapper", () => {
    const tree = renderer.create(<FormWrapper />);
    expect(tree).toMatchSnapshot();
  });
  it("styledSelect", () => {
    const tree = renderer.create(<StyledSelect value={""} />);
    expect(tree).toMatchSnapshot();
  });
  it("Row", () => {
    const tree = renderer.create(<Row />);
    expect(tree).toMatchSnapshot();
  });
});
