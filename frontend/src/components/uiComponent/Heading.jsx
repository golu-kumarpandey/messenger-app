import { getThemText } from "../../utils/helper";
const Heading = ({ children, verient = "h1", mode = null, className = "" }) => {
  const Tag = `${verient}`;
  const themeText = getThemText(mode);
  const baseCalss = `text-sm first-letter:uppercase `;
  const style = {
    h1: `${baseCalss} text-[18px] md:text[24px] font-semibold`,
    h2: `${baseCalss} text-[17px] font-semibold`,
    p: `${baseCalss} text-[14px]`,
    span: `${baseCalss} text-xs`,
  };
  return (
    <Tag className={`${themeText} ${style[verient]} ${className} fonts`}>
      {children}
    </Tag>
  );
};

export default Heading;
