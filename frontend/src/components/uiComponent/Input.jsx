import { getThemBackground, getThemText } from "../../utils/helper";

const Input = ({
  placeholder = "",
  type = "",
  onChange = null,
  id = "",
  name = "",
  value = "",
  onBlur = null,
  ring = false,
  mode = null,
  className = "",
}) => {
  const themeText = getThemText(mode);
  const themeBackground = getThemBackground(mode);

  return (
    <>
      {type === "file" ? (
        <input
          type={type}
          id={id}
          className="hidden"
          onChange={onChange}
          name={name}
          onBlur={onBlur}
          value={value}
        />
      ) : (
        <input
          className={`w-full placeholder:text-gray-500 ${themeText} ${themeBackground} py-1 px-1  outline-none ${ring ? "focus:ring-1 focus:ring-blue-900 focus:ring-offset-1" : ""} ${className}`.trim()}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          id={id}
          name={name}
          value={value}
        />
      )}
    </>
  );
};

export default Input;
