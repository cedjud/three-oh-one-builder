import styles from "./styles.module.css";

import Selector from "../Selector";

const Category = ({ label, items, open }) => (
  <div className={styles.container}>
    <details open={open}>
      <summary>{label}</summary>
      <ul>
        {items.map((item, index) => (
          <Selector key={item + index} item={item} category={label} />
        ))}
      </ul>
    </details>
  </div>
);

export default Category;
