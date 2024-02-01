import { useRouter, useSearchParams } from 'next/navigation'
import styles from "./formSteps.module.scss";

function getPopulateURL(step) {
  switch (step) {
    case 1:
      return '?populate[0]=body,footer&populate[1]=body.input&populate[2]=footer.buttons'
    case 2:
      return '?populate[0]=body,footer&populate[1]=body.plan&populate[2]=assets&populate[3]=footer.buttons'

    default:
      return ''
  }

  return ''
}
async function getFormData(step) {
  const populateURL = getPopulateURL(step);
  const res = await fetch(`https://strapi-ziqe.onrender.com/api/forms/${step}${populateURL}`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

function getButtonLabel(button) {
  switch (button) {
    case 'next':
      return 'Next Step'
    case 'back':
      return 'Go Back'
    case 'next':
      return 'Next Step'

    default:
      return ''
  }
}

async function FormSteps() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const step = Number(searchParams.get('step') || "1")

  const handleNextStep = () => {
    router.push(`/?step=${step + 1}`);
  }

  const handleBackStep = () => {
    router.push(`/?step=${step - 1}`);
  }

  const formResponse = await getFormData(step);
  const formData = formResponse?.data?.attributes;

  return (
    <div className={styles.Steps}>
      {formData.heading && <h1 className={styles.heading}>{formData.heading}</h1>}
      {formData.subheading && <h2 className={styles.subheading}>{formData.subheading}</h2>}
      {formData.body && formData.body.map(body => (
        <div key={body.id} className={styles.body}>
          {body?.input && (
            <div className={styles.inputList}>
              {body.input?.map(input => (
                <div key={input.title} className={styles.inputs}>
                  <div className={styles.messages}>
                    <label className={styles.label}>{input.title}</label>
                    {false && <span className={styles.error}>This field is required</span>}
                  </div>
                  <input className={styles.input} type={input.type} placeholder={input.placeholder} required={input.required} />
                </div>
              ))}
            </div>
          )}
          {body?.plan && (
            <>
              <div className={styles.planList}>
                {body?.plan.map(plan => (
                  <div key={plan.id} className={styles.card}>
                    <img src={`/${plan.heading}.svg`} alt={`${plan.heading} icon`} />
                    <div>
                      <h1 className={styles.h1}>{plan.heading}</h1>
                      <p className={styles.price}>{plan.priceMonthly}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.choices}>
                <span className={styles.active}>Monthly</span>
                <input type="checkbox" />
                <span>Yearly</span>
              </div>
            </>
          )}
        </div>
      ))}
      {formData.footer && <div className={styles.footer}>{formData.footer?.map(footerItem => {
        if (footerItem?.buttons) {
          return (
            <div key={footerItem.id} className={styles.buttons}>
              {footerItem?.buttons?.map(button => (
                <button className={[styles[button.button], styles.button].join(' ')} key={button.id} onClick={button.button === 'next' ? handleNextStep : button.button === 'back' ? handleBackStep : undefined}>
                  {getButtonLabel(button.button)}
                </button>
              ))}
            </div>
          )
        }
      })}</div>}
    </div>
  );
}

export default FormSteps;