import Lable from "../components/uiComponent/Lable";
import Input from "../components/uiComponent/Input";
import Profile from "../components/messengerComponent/Profile";
import Button from "../components/uiComponent/Button";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { successClear, errorClear, postUser } from "../redux/userSlice";
import Container from "../components/uiComponent/Container";
import ThemeMode from "../components/uiComponent/ThemMode";
import { ColCenter, ColGap, RowGap } from "../components/uiComponent/Flex";
import LayOut from "../components/uiComponent/LayOut";
import Box from "../components/uiComponent/Box";
import Heading from "../components/uiComponent/Heading";
import { addNewFriends } from "../redux/mesengerSlice";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const { isRegistered, error, successMessage, userInfo } = useSelector(
    (store) => store.user,
  );
  const dispatch = useDispatch();
  const { mode, modeStone, modeBlue } = useSelector((state) => state.theme);

  const navigate = useNavigate();

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setUserDetails({
        ...userDetails,
        image: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const { userName, email, password, confirmPassword, image } = userDetails;

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    dispatch(postUser(formData));
  };

  useEffect(() => {
    if (isRegistered) {
      toast.success(successMessage);
      console.log(userInfo, "userInfo");
      dispatch(
        addNewFriends({
          ...userInfo,
          count: 0,
          lastMessage: null,
        }),
      );
      dispatch(successClear());
      navigate("/login");
    }

    if (error) {
      error.map((err) => toast.error(err));
      dispatch(errorClear());
    }
  }, [successMessage, userInfo, isRegistered, error, dispatch, navigate]);

  return (
    <Container mode={mode}>
      <ColCenter className="h-full">
        <ThemeMode>
          <Button verient="icon" className="fixed top-1 right-2">
            {mode === "dark" ? "🌙" : "☀️"}
          </Button>
        </ThemeMode>

        <LayOut>
          <Box mode={modeStone} className="py-4 px-3 flex-1">
            <Heading className="text-center" mode={modeStone}>
              Login
            </Heading>
            <form onSubmit={handleRegister}>
              <ColGap>
                <Lable htmlFor="email" mode={modeBlue}>
                  Name
                </Lable>
                <Input
                  placeholder="name"
                  type="text"
                  id="userName"
                  name="userName"
                  onChange={handleChange}
                  value={userDetails.userName}
                  mode={modeBlue}
                />
              </ColGap>
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
                  value={userDetails.email}
                  mode={modeBlue}
                />
              </ColGap>

              <ColGap>
                <Lable htmlFor="password" mode={modeBlue}>
                  Password
                </Lable>
                <Input
                  placeholder="password"
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={userDetails.password}
                  mode={modeBlue}
                />
              </ColGap>

              <ColGap>
                <Lable htmlFor="confirmPassword" mode={modeBlue}>
                  Confirm Password
                </Lable>
                <Input
                  placeholder="confirm password"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={userDetails.confirmPassword}
                  mode={modeBlue}
                />
              </ColGap>

              <RowGap className="py-2">
                <Profile imgUrl={imagePreview} />

                <Input
                  type="file"
                  id="file"
                  className="hidden"
                  name="image"
                  onChange={handleImage}
                />
                <Lable htmlFor="file" mode={modeBlue} className="py-1">
                  Select Image
                </Lable>
              </RowGap>

              <ColGap>
                <Button type="submit" mode={modeBlue}>
                  Register
                </Button>
                <Button verient="link" to="/login" mode={modeBlue}>
                  Login your account
                </Button>
              </ColGap>
            </form>
          </Box>
        </LayOut>
      </ColCenter>
    </Container>
  );
};

export default Register;
