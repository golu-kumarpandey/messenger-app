// import Formgroup from "../components/messengerComponent/Formgroup";
import Lable from "../components/uiComponent/Lable";
import Input from "../components/uiComponent/Input";
// import Button from "../components/uiComponent/Button";
// import LinkButton from "../components/uiComponent/LinkButton";
import { successClear, errorClear, loginUser } from "../redux/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Heading from "../components/uiComponent/Heading";
import Container from "../components/uiComponent/Container";
import Button from "../components/uiComponent/Button";

import LayOut from "../components/uiComponent/LayOut";
import { ColCenter, ColGap } from "../components/uiComponent/Flex";
import Box from "../components/uiComponent/Box";
import ThemeMode from "../components/uiComponent/ThemMode";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const dispatch = useDispatch();
  const initialState = useSelector((store) => store.user);
  const { mode, modeBlue, modeStone } = useSelector((state) => state.theme);
  const { error, successMessage, isAuthenticated } = initialState;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginDetails));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success(successMessage);
      navigate("/");
      dispatch(successClear());
    }
    if (error) {
      error.map((err) => toast.error(err));
      dispatch(errorClear());
    }
  }, [
    isAuthenticated,
    successMessage,
    error,
    navigate,
    dispatch,
    initialState,
  ]);

  return (
    <Container mode={mode}>
      <ColCenter className="h-full">
        <ThemeMode>
          <Button verient="icon" className="fixed top-1 right-2">
            {mode === "dark" ? "🌙" : "☀️"}
          </Button>
        </ThemeMode>
        <LayOut>
          <Box mode={modeStone} className="py-4 px-3">
            <Heading className="text-center" mode={modeStone}>
              Login
            </Heading>
            <form onSubmit={handleSubmit} className="w-full">
              <ColGap>
                <Lable htmlFor="email" mode={modeBlue}>
                  Email
                </Lable>
                <Input
                  placeholder="email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={loginDetails.email}
                  ring={true}
                  mode={modeBlue}
                />
              </ColGap>

              <ColGap>
                <Lable htmlFor="passowrd" mode={modeBlue}>
                  password
                </Lable>
                <Input
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={loginDetails.password}
                  ring={true}
                  mode={modeBlue}
                />
              </ColGap>

              <ColGap className="mt-3">
                <Button mode={modeBlue}>Login</Button>
                <Button verient="link" to="/register" mode={modeBlue}>
                  Don't you have account
                </Button>
              </ColGap>
            </form>
          </Box>
        </LayOut>
      </ColCenter>
    </Container>
  );
};
export default Login;
