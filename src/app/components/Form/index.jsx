'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Menu from "../Menu";
import FormSteps from "./Steps";
import styles from "./form.module.scss";

function Form() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const step = Number(searchParams.get('step') || "1")

  const handleNextStep = () => {
    router.push(`/?step=${step + 1}`);
  }

  const handleBackStep = () => {
    router.push(`/?step=${step - 1}`);
  }

  return (
    <div className={styles.Form}>
      <Menu />
      <FormSteps step={step} nextStep={handleNextStep} backStep={handleBackStep} />
    </div>
  );
}

export default Form;