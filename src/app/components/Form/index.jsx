import Menu from "../Menu";
import styles from "./form.module.css";

function getPopulate(step) {
  switch (step) {
    case 1:
      return '?populate[0]=body,footer&populate[1]=body.input&populate[2]=footer.buttons'
    case 2:
      return '?populate[0]=body,footer&populate[1]=body.plan&populate[2]=assets&populate[3]=footer.buttons'

    default:
      return ''
  }
}

async function getFormData(step) {
  const populate = getPopulate(step);
  const res = await fetch(`http://localhost:1337/api/forms/${step}${populate}`)

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

async function Form() {
  const step = 1

  const formResponse = await getFormData(step);
  const formData = formResponse?.data?.attributes;
  console.log(formData)
  console.log(formData.body)

  return (
    <div className={styles.Form}>
      <Menu />
      <div className={styles.content}>
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
            return <div key={footerItem.id} className={styles.buttons}>{footerItem?.buttons?.map(button => <button className={[styles[button.button], styles.button].join(' ')} key={button.id}>{getButtonLabel(button.button)}</button>)}</div>
          }
        })}</div>}
      </div>
    </div>
  );
}

export default Form;