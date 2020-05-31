import React from "react";
import renderer, { act } from "react-test-renderer";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";

import "jest-styled-components";

import { TestingDashBoardList } from "../../../components/Dashboard/DashBoardList";
import {
  FETCH_SEARCH_DATA_QUERY,
  SEARCH_CARS_QUERY,
} from "../../../graphql/query";

const mocks = [
  {
    request: {
      query: SEARCH_CARS_QUERY,
      variables: {
        carModel: "",
        carMake: "",
        carInStock: "",
        carYear: 0,
        page: 1,
        limit: 20,
      },
    },
    result: {
      data: {
        searchCars: {
          docs: [
            {
              _id: "1",
              carCost: "$5000",
              carImage: "https://dummyimage.com/600x400/000/fff",
              carInStock: true,
              carMake: "BMW",
              carModel: "x5",
              carVin: "5555555",
              carYear: 2005,
            },
          ],
          hasNextPage: false,
          nextPage: 1,
        },
      },
    },
  },
  {
    request: {
      query: FETCH_SEARCH_DATA_QUERY,
    },
    result: {
      data: {
        fetchCars: {
          myObject: {
            BWM: {
              carModel: ["x5", "x7"],
              carYear: [2000, 2019],
            },
          },
          myValue: "JSON",
        },
      },
    },
  },
];

it("DashBoardList renders", async () => {
  const tree = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <TestingDashBoardList />
    </MockedProvider>
  );
  await act(() => wait(0));
  expect(tree).toMatchSnapshot();
});
