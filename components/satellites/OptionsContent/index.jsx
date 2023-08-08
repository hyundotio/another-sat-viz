// utils
import { memo } from "react";

// components and styles
import ObjectFiltering from "@/components/satellites/ObjectFiltering";
import styles from "@/styles/shared/CesiumOptions.module.scss";

const OptionsContent = ({
  objectCategories,
  toggleCategoryVisibility,
}) => {
  return (
    <div
      className={`
        ${styles["navigation"]}
      `}
    >
      {
        <>
          <ObjectFiltering
            objectCategories={objectCategories}
            toggleCategoryVisibility={toggleCategoryVisibility}
          />
        </>
      }
    </div>
  );
};

export default memo(OptionsContent);
