import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Waypoint } from "react-waypoint";
import withApollo from "../../lib/withApollo";
import { ICar } from "../../server/models/car.model";
import { Field, Form, Formik } from "formik";
import { MenuItem, InputLabel, FormControl, Button } from "@material-ui/core";
import {
  FETCH_SEARCH_DATA_QUERY,
  SEARCH_CARS_QUERY,
} from "../../graphql/query";
import CheckLogin from "../CheckLogin/CheckLogin";
import {
  FormWrapper,
  Row,
  StyledSelect,
  DisplayCarsGrid,
  CarInStock,
} from "./DashboardStyled";

const DashBoardList = () => {
  const searchDataCars = useQuery(FETCH_SEARCH_DATA_QUERY, {
    fetchPolicy: "cache-first",
  });
  const objectSearchDataLoading = searchDataCars.loading;
  const objectSearchData = searchDataCars.data;
  const { data, loading, error, fetchMore, refetch } = useQuery(
    SEARCH_CARS_QUERY,
    {
      variables: {
        carModel: "",
        carMake: "",
        carInStock: "",
        carYear: 0,
        page: 1,
        limit: 20,
      },
      fetchPolicy: "cache-and-network",
    }
  );
  if (error) return <div>Error...</div>;
  if (
    (typeof data === "undefined" && loading) ||
    !data.searchCars ||
    !data.searchCars.docs ||
    objectSearchDataLoading
  ) {
    return <div>Loading...</div>; //TODO spinner
  }
  return (
    <>
      <CheckLogin>
        <Formik
          initialValues={{ make: "", model: "", inStock: "", carYear: 0 }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            refetch({
              carModel: values.model,
              carMake: values.make,
              carInStock: values.inStock,
              carYear: values.carYear,
              page: 1,
              limit: 20,
            });
            setSubmitting(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormWrapper>
                <Row>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                    <Field
                      labelId="demo-simple-select-label"
                      as={StyledSelect}
                      type="text"
                      name="make"
                      onChange={(e: React.FormEvent<HTMLFormElement>) => {
                        setFieldValue("model", "");
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      value={values.make}
                    >
                      {objectSearchData &&
                        [
                          <MenuItem value={""} key={Math.random()}>
                            All
                          </MenuItem>,
                        ].concat(
                          Object.keys(objectSearchData.fetchCars.myObject).map(
                            (key) => {
                              return (
                                <MenuItem value={key} key={key + Math.random()}>
                                  {key}
                                </MenuItem>
                              );
                            }
                          )
                        )}
                    </Field>
                  </FormControl>
                </Row>
                <Row>
                  <FormControl>
                    <InputLabel id="model-simple-select-label">
                      Model
                    </InputLabel>
                    <Field
                      labelId="model-simple-select-label"
                      as={StyledSelect}
                      type="text"
                      name="model"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.model}
                    >
                      {[
                        <MenuItem value={""} key={Math.random()}>
                          All
                        </MenuItem>,
                      ].concat(
                        (values.make &&
                          objectSearchData.fetchCars.myObject[
                            values.make
                          ].carModel.map((name: string) => {
                            return (
                              <MenuItem value={name} key={name + Math.random()}>
                                {name}
                              </MenuItem>
                            );
                          })) ||
                          []
                      )}
                    </Field>
                  </FormControl>
                </Row>
                <Row>
                  <FormControl>
                    <InputLabel id="year-simple-select-label">Year</InputLabel>
                    <Field
                      labelId="year-simple-select-label"
                      as={StyledSelect}
                      type="text"
                      name="carYear"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.carYear}
                    >
                      {[
                        <MenuItem value={0} key={Math.random()}>
                          All
                        </MenuItem>,
                      ].concat(
                        (values.make &&
                          objectSearchData.fetchCars.myObject[
                            values.make
                          ].carYear.map((name: number) => {
                            return (
                              <MenuItem value={name} key={name + Math.random()}>
                                {name}
                              </MenuItem>
                            );
                          })) ||
                          []
                      )}
                    </Field>
                  </FormControl>
                </Row>
                <Row>
                  <FormControl>
                    <InputLabel id="inStock-simple-select-label">
                      Stock
                    </InputLabel>
                    <Field
                      labelId="inStock-simple-select-label"
                      as={StyledSelect}
                      type="text"
                      name="inStock"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.inStock}
                    >
                      <MenuItem value={""} key={Math.random()}>
                        All
                      </MenuItem>
                      <MenuItem value={"false"} key={Math.random()}>
                        Not In Stock
                      </MenuItem>
                      <MenuItem value={"true"} key={Math.random()}>
                        In Stock
                      </MenuItem>
                    </Field>
                  </FormControl>
                </Row>
                <Row>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      margin: "10px 0px",
                    }}
                  >
                    Submit
                  </Button>
                </Row>
              </FormWrapper>
            </Form>
          )}
        </Formik>
      </CheckLogin>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {data.searchCars.docs.map(
          (
            {
              _id,
              carCost,
              carInStock,
              carImage,
              carMake,
              carModel,
              carVin,
              carYear,
            }: ICar,
            i: number
          ) => {
            return (
              <DisplayCarsGrid key={_id}>
                <img className="carImg" src={carImage} alt={carImage} />
                <div className="carCost">{carCost}</div>
                <div className="cost">Cost </div>
                <CarInStock available={carInStock}>
                  {carInStock ? "Available" : "Not available"}
                </CarInStock>
                <div className="inStock">In Stock </div>
                <div className="carMake">{carMake}</div>
                <div className="make">Brand</div>
                <div className="carModel">{carModel}</div>
                <div className="model">Model </div>
                <div className="carVin">{carVin}</div>
                <div className="vin">Vin Number </div>
                <div className="carYear">{carYear}</div>
                <div className="year">Year </div>
                {i === data.searchCars.docs.length - 10 && (
                  <Waypoint
                    onEnter={() =>
                      data.searchCars.hasNextPage &&
                      !loading &&
                      !objectSearchDataLoading &&
                      fetchMore({
                        variables: {
                          limit: 20,
                          page: data.searchCars.nextPage,
                        },
                        updateQuery: (prev: any, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return Object.assign({}, prev, {
                            searchCars: {
                              ...prev.searchCars,
                              ...fetchMoreResult.searchCars,
                              docs: [
                                ...prev.searchCars.docs,
                                ...fetchMoreResult.searchCars.docs,
                              ],
                            },
                          });
                        },
                      })
                    }
                  />
                )}
              </DisplayCarsGrid>
            );
          }
        )}
        <h2 style={{ textAlign: "center" }}>Automedon CarYard</h2>
      </div>
    </>
  );
};
export const TestingDashBoardList = DashBoardList;
export default withApollo(DashBoardList);
