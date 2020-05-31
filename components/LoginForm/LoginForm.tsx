import React, { useEffect, useState } from "react";
import withApollo from "../../lib/withApollo";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import Router from "next/router";
import { setLoginTrue } from "../../lib/browserFunctions";
import { LOGIN_USER_MUTATION } from "../../graphql/mutation";
import { CHECKING_GRAPHQLSERVER_QUERY } from "../../graphql/query";

const LoginForm = () => {
  const [user, setUser]: any = useState({
    data: {
      login: false,
    },
  });
  const [loginUser, { data }] = useMutation(LOGIN_USER_MUTATION);
  const checkServer = useQuery(CHECKING_GRAPHQLSERVER_QUERY);
  useEffect(() => {
    if (user.data.login) {
      setLoginTrue();
      Router.push("/dashboard");
    }
  }, [user.data.login]);

  return (
    <div>
      {" "}
      <h1>Login Form</h1>
      <h5>
        Health of GraphqlServer{" "}
        {checkServer.data
          ? checkServer.data.graphqlServerIsOn
          : "Graphql server is not working"}
      </h5>
      {data && data.login && (
        <div>
          Info About User
          <ul>
            <li>User ID: {data.login._id}</li>
            <li>User Email: {data.login.email}</li>
          </ul>
        </div>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.email) {
            errors["email"] = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors["email"] = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          const email: string = values.email;
          const password: string = values.password;
          const fetchedUser = await loginUser({
            variables: {
              input: { email, password },
            },
          });
          setUser(fetchedUser);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              Email{" "}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
            </div>
            <div>
              Password{" "}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default withApollo(LoginForm);
