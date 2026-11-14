import { getThemBackground } from "../../utils/helper";

const Box = ({ children, mode, className = "", ...props }) => {
  const themeBackground = getThemBackground(mode);
  return (
    <div className={`rounded-sm ${themeBackground} ${className}`} {...props}>
      {children}
    </div>
  );
};
export default Box;
