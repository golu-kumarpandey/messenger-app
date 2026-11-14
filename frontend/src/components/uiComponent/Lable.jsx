import { getThemText } from "../../utils/helper";

const Lable = ({ children, htmlFor = "", mode = null, className = "" }) => {
  const themeText = getThemText(mode);

  if (htmlFor === "file") {
    return (
      <label
        htmlFor={htmlFor}
        className={`text-sm cursor-pointer md:text-xl text-left ${themeText} ${className}`}
      >
        {children}
      </label>
    );
  }
  return (
    <label
      htmlFor={htmlFor}
      className={`text-left text-sm md:text-xl ${themeText} ${className}`}
      name={name}
    >
      {children}
    </label>
  );
};
export default Lable;
