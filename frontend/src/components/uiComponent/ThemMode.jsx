import { changeTheme } from "../../redux/themSlice";
import { useDispatch } from "react-redux";
import Button from "./Button";
const ThemeMode = ({ children, verient = "", mode = null }) => {
  const dispatch = useDispatch();
  const handleMode = () => {
    dispatch(changeTheme());
  };
  return (
    <Button mode={mode} verient={verient} onClick={handleMode} verient="icon">
      {children}
    </Button>
  );
};
export default ThemeMode;
