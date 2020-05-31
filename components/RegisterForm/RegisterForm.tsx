import React, { useEffect } from "react";
import withApollo from "../../lib/withApollo";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Form } from "formik";
import Router from "next/router";
import { REGISTER_USER_MUTATION } from "../../graphql/mutation";

const RegisterForm = () => {
  const [createUser, { data }] = useMutation(REGISTER_USER_MUTATION);
  useEffect(() => {
    if (data && data.register) {
      Router.push("/login");
    }
  }, [data]);
  return (
    <div>
      {" "}
      <h1>Not a cool form huh? I will change it later... certainly...</h1>
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
          await createUser({
            variables: {
              input: { email, password },
            },
          });

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
              {data && data.register == false ? "User already exists" : null}
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

export default withApollo(RegisterForm);
