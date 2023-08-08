// utils
import { memo } from "react";

// components and styles
import OptionsContent from "@/components/satellites/OptionsContent";

const Options = ({
  objectCategories,
  toggleCategoryVisibility
}) => {

  return (
    <>
      <OptionsContent
        objectCategories={objectCategories}
        toggleCategoryVisibility={toggleCategoryVisibility}
      />
    </>
  );
};

export default memo(Options);
