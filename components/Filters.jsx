// utils
import { memo } from "react";
import { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import { Checkbox } from '@carbon/react';

const Filters = ({ objectCategories, toggleCategoryVisibility, toggleOrbitVisibility, orbitCategories }) => {
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
    <>
      <div className={styles["object-filtering"]}>
        <fieldset className="cds--fieldset">
          <legend className="cds--label">Visible object types ({totalCount.toLocaleString()} total)</legend>
          { categories.length > 0 && renderCategories() }
        </fieldset>
      </div>
      <div className={styles["object-filtering"]}>
        <fieldset className="cds--fieldset">
          <legend className="cds--label">Visible orbits</legend>
          <Checkbox
            labelText={<span className={styles['orbit-selection']}><span className={styles["sat-type-circle"]}></span>Low earth orbit</span>}
            id={'leo-checkbox'}
            value={'leo'}
            checked={orbitCategories[0].visible}
            onChange={() => {
              toggleOrbitVisibility(0);
            }}
          />
          <Checkbox
            labelText={<span className={styles['orbit-selection']}><strong>▲</strong>Medium earth orbit</span>}
            id={'meo-checkbox'}
            value={'meo'}
            checked={orbitCategories[1].visible}
            onChange={() => {
              toggleOrbitVisibility(1);
            }}
          />
          <Checkbox
            labelText={<span className={styles['orbit-selection']}><strong>+</strong>Geosynchronous orbit</span>}
            id={'geo-checkbox'}
            value={'geo'}
            checked={orbitCategories[2].visible}
            onChange={() => {
              toggleOrbitVisibility(2);
            }}
          />
        </fieldset>
      </div>
    </>
  );
};

export default memo(Filters);
