import styled from "styled-components";
import Select from "@material-ui/core/Select";

export const StyledSelect = styled(Select)`
  min-width: 300px;
`;

export const DisplayCarsGrid = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 100px);
  grid-template-columns: repeat(8, 100px);
  grid-template-areas:
    "carImg carImg make    model    cost    year    vin    inStock"
    "carImg carImg carMake carModel carCost carYear carVin carInStock";
  align-items: stretch;
  justify-items: stretch;
  text-align: center;
  border: 1px solid black;
  @media (max-width: 700px) {
    max-width: 400px;
    grid-template-rows: repeat(4, 100px);
    grid-template-columns: repeat(4, 79px);
    grid-template-areas:
      "carImg carImg make    model   "
      "carImg carImg carMake carModel"
      "cost    year    vin    inStock"
      "carCost carYear carVin carInStock";
    .carModel {
      grid-area: carVin;
      word-break: break-all;
    }
  }
  * {
    box-sizing: content-box;
    vertical-align: bottom;
    background: azure;
    font-size: 18px;
    border: 1px solid black;
  }
  .carImg {
    grid-area: carImg;
    width: 100%;
    height: 100%;
  }
  .vin {
    grid-area: vin;
  }
  .carVin {
    grid-area: carVin;
    word-break: break-all;
  }
  .cost {
    grid-area: cost;
  }
  .carCost {
    grid-area: carCost;
    font-weight: bolder;
  }
  .inStock {
    grid-area: inStock;
  }
  .make {
    grid-area: make;
  }
  .carMake {
    grid-area: carMake;
    font-weight: bolder;
  }
  .model {
    grid-area: model;
  }
  .carModel {
    grid-area: carModel;
    font-weight: bolder;
  }
  .year {
    grid-area: year;
  }
  .carYear {
    grid-area: carYear;
    font-weight: bolder;
  }
`;
export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  div {
    margin-right: 5px;
  }
`;
export const CarInStock = styled.div<{ available: boolean }>`
  & {
    grid-area: carInStock;
    color: ${(props) => (props.available ? "green" : "red")};
    font-weight: bold;
  }
`;
