// 📁 components/common/Flex.jsx

import { getThem } from "../../utils/helper";
const Container = ({ children, mode = null, className = "", ...props }) => {
  const themStyle = getThem(mode);
  return (
    <>
      <section
        className={`p-2 ${themStyle} ${mode} ${className} h-screen font-`}
        {...props}
      >
        {children}
      </section>
    </>
  );
};

export default Container;
