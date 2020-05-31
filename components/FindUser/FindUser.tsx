import React from "react";
import withApollo from "../../lib/withApollo";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import { RESET_TOKEN_MUTATION } from "../../graphql/mutation";
import { FIND_USER_QUERY } from "../../graphql/query";

const FindForm = () => {
  const { data } = useQuery(FIND_USER_QUERY, {
    fetchPolicy: "network-only",
    pollInterval: 5000,
  });
  const [invalidToken] = useMutation(RESET_TOKEN_MUTATION);

  return (
    <div>
      {" "}
      <h1>Find Form</h1>
      {data && data.findUser && (
        <div>
          Provided Info by DB (just reload after logging and check cookies)
          <ul>
            <li>User Email: {data.findUser.email}</li>
            <li>User HashedPassword: {data.findUser.hashedPassword}</li>
          </ul>
        </div>
      )}
      <Formik
        initialValues={{ id: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            This Form will fetch data from DB if you are logged
            <button onClick={() => invalidToken()}>
              Invalidate current cookies
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withApollo(FindForm);
