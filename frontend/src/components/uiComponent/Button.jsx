import { getThemBackground, getThemText } from "../../utils/helper";
import { Link } from "react-router-dom";

const Button = ({
  children,
  verient = "default",
  onClick = null,
  mode = null,
  to = "",
  className = "",
  ml = true,
}) => {
  const baseClass = "cursor-pointer flex flex-row items-center justify-center ";
  const style = {
    default: `w-full py-2 rounded-sm cursor-pointer`,
    icon: `h-6 w-6 rounded-full ${ml ? "ml-auto" : ""}`,
    sm: "h-5 w-5 rounded-full text-xs",
    link: "text-center",
    fixedIcon: "fixed top-1 right-2",
  };

  const themeBackground = getThemBackground(mode);
  const themeText = getThemText(mode);

  return (
    <>
      {verient !== "link" ? (
        <button
          onClick={onClick}
          className={`${baseClass} ${themeBackground} ${themeText} ${style[verient]} ${className}`}
        >
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className={`${baseClass} ${themeText} ${style[verient]} ${className}`}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
