import styles from "./menu.module.scss";

async function getFormData(step) {
  const res = await fetch(`https://strapi-ziqe.onrender.com/api/forms/${step}?populate[0]=body&populate[1]=body.plan`)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getMenuData() {
  const res = await fetch('https://strapi-ziqe.onrender.com/api/menu?populate=*')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function Menu() {
  const formResponse = await getFormData(2);
  const formData = formResponse?.data?.attributes;

  const menuResponse = await getMenuData()
  const menuData = menuResponse?.data?.attributes?.list?.reduce((acc, item) => {
    if (item.heading === "SELECT PLAN") {
      console.log(formData.body[0]?.plan)
      if (formData.body?.length > 0 && formData.body[0]?.plan?.length > 0) acc.push(item)
      return acc
    }

    acc.push(item)
    return acc
  }, [])

  return <div className={styles.Menu}>{menuData.map((item, index) => <div key={item.id} className={styles.item}>
  <span className={styles.index}>{index + 1}</span>
  <div className={styles.title}>
    <span className={styles.description}>{item.description.replace('{n}', index + 1)}</span>
    <span className={styles.name}>{item.heading}</span>
  </div>
</div>)}</div>;
}

export default Menu;