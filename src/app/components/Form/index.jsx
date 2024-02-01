'use client'

import { Suspense } from 'react'
import Menu from "../Menu";
import FormSteps from "./Steps";
import styles from "./form.module.scss";

function Form() {

  return (
    <div className={styles.Form}>
      <Menu />
      <Suspense>
        <FormSteps />
      </Suspense>
    </div>
  );
}

export default Form;