import { useState } from "react";
import styles from "./styles.module.css";

import useStore from "../../lib/store";

const Selector = ({ item, category }) => {
  const [active, setActive] = useState(false);
  const activateSelector = useStore((state) => state.activateSelector);
  const deactivateSelector = useStore((state) => state.deactivateSelector);

  const activate = () => {
    setActive(true);
    activateSelector(item, category);
  };

  const deactivate = () => {
    setActive(false);
    deactivateSelector(item, category);
  };

  const handleChange = (event) => {
    if (!active) {
      activate();
    } else {
      deactivate();
    }
  };

  return (
    <li className={styles.container}>
      <input
        type="checkbox"
        id={item}
        onChange={handleChange}
        checked={active}
      />
      <label htmlFor={item}>{item}</label>
    </li>
  );
};

export default Selector;
