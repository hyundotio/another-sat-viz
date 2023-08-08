import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Checkbox } from '@carbon/react';

const ObjectFiltering = ({ objectCategories, toggleCategoryVisibility }) => {
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const handleCategoryChange = (name) => {
    toggleCategoryVisibility(name);
  };

  const renderCategories = () => {
    return categories.map((cat) => {
      const backgroundColor = `rgba(
        ${cat.color.red * 255},
        ${cat.color.green * 255},
        ${cat.color.blue * 255},
        ${cat.color.alpha}
      )`;
      const circle = <div className={styles["sat-type-circle"]} style={{backgroundColor: backgroundColor}}></div>

      return (
        <Checkbox
          labelText={<div className={styles["sat-checkbox-container"]}>{circle}{`${cat.name} - ${cat.objectsCount.toLocaleString()}`}</div>}
          id={cat.name}
          checked={cat.visible}
          key={cat.name}
          onChange={() => handleCategoryChange(cat.name)}
        />
      );
    });
  };

  useEffect(() => {
    if (objectCategories && objectCategories.length) {
      setCategories(objectCategories);
      setTotalCount(objectCategories.reduce((a,c) => c.objectsCount + a, 0));
    }
    
  }, [objectCategories]);

  return (
    <div className={styles["object-filtering"]}>
      <fieldset className="cds--fieldset">
        <legend className="cds--label">Visible object types ({totalCount.toLocaleString()} total)</legend>
        { categories.length > 0 && renderCategories() }
      </fieldset>
    </div>
  );
};

export default ObjectFiltering;