import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import styles from "./infoSection.module.css";

type Props = {
  title: string;
  editMode: boolean;
  // data: string[];
};

interface FormData {
  inputs: string[];
}

const data = ["test1", "test2", "test3", "test4"];

const InfoSection = (props: Props) => {
  const [inputs, setInputs] = useState<string[]>(data);

  const onSubmit = (values: FormData) => {
    // Form submission logic goes here
  };

  const addInput = () => {
    setInputs((prevInputs) => [...prevInputs, ""]); // Add an empty string to the array
  };

  return props.editMode ? (
    <div className={styles.infoSection}>
      <Formik<FormData> initialValues={{ inputs: data }} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <Form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.title}>{props.title}</div>
            {inputs.map((input, index) => (
              <Field
                className={styles.input}
                key={index}
                name={`inputs[${index}]`}
                value={values.inputs[index]}
                onChange={handleChange}
              />
            ))}
            <button type="button" onClick={addInput}>
              Add Input
            </button>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <div className={styles.infoSection}>
      <div className={styles.title}>{props.title}</div>
      <div></div>
    </div>
  );
};

export default InfoSection;
