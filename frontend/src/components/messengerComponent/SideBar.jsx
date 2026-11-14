import Profile from "./Profile";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Button from "../uiComponent/Button";
import Input from "../uiComponent/Input";
import Friends from "./Friends";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../uiComponent/Loader";
import { useEffect, useState } from "react";
import Box from "../uiComponent/Box";
import { ColCenter, ColGap, RowBetween, RowGap } from "../uiComponent/Flex";
import Heading from "../uiComponent/Heading";
import { CiDark, CiLight } from "react-icons/ci";
import ThemeMode from "../uiComponent/ThemMode";
import InputBox from "../uiComponent/InputBox";
import { customBorderRight, removeLocalStorage } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../redux/userSlice";
import toast from "react-hot-toast";

const SideBar = ({
  friends,
  setCurrentFriend,
  checkActiveUser,
  selectedFriend,
  setSelectedFriend,
  socketMessage,
  setSocketMessage,
  socket,
  isChatOpen,
  setIsChatOpen,
  openFriendDetails,
  setOpenFriendDetails,
  setIsOpenSidebar,
  isSidebarOpen,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.messenger);
  const { mode, modeNatural, modeBlue, modeStone } = useSelector(
    (state) => state.theme,
  );
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  const [filterfriend, setFilterFriend] = useState([]);

  const handleInput = (e) => {
    const value = e.target.value;

    const filterList = friends.filter((friend) =>
      friend.userName.toLowerCase().includes(value.toLocaleLowerCase()),
    );
    setFilterFriend(filterList);
    setInputValue(value);
  };

  const handleLogout = () => {
    // toast.success("handle logout click ho raha hain");
    dispatch(userLogout());
    removeLocalStorage("token");
    socket.current.emit("logout", userInfo);
    socket.current.disconnect();
    toast.success("logout successfully");
    navigate("/login");
  };

  useEffect(() => {
    setFilterFriend(friends);
  }, [friends]);

  const sideBarOpen = isSidebarOpen && !isChatOpen && !openFriendDetails;

  return (
    <Box
      className={`py-2 h-full px-1 ${sideBarOpen ? "block" : "hidden"}  md:block overflow-y-auto scrollbar-none ${customBorderRight}`}
    >
      <ColGap className="h-full gap-3">
        <Box>
          <RowBetween>
            <RowGap className="gap-2">
              <Profile imgUrl={`/image/${userInfo?.image}`} />{" "}
              <Heading mode={mode}>{userInfo?.userName}</Heading>
            </RowGap>
            <RowGap>
              <ThemeMode verient="icon" mode={modeNatural}>
                {mode === "dark" ? (
                  <CiDark size={"18px"} />
                ) : (
                  <CiLight Size={"18px"} />
                )}
              </ThemeMode>
              <Button verient="icon" mode={modeNatural} onClick={handleLogout}>
                <IoMdLogOut />
              </Button>
            </RowGap>
          </RowBetween>
        </Box>
        <InputBox mode={modeNatural}>
          <FaSearch size={"20px"} />
          <Input
            type="text"
            placeholder="search"
            onChange={handleInput}
            value={inputValue}
            className="bg-transparent outline-none p-0"
            mode={modeNatural}
          />
        </InputBox>

        <Box className="overflow-y-auto scrollbar-none h-full">
          <ColGap className="gap-2 h-full">
            {loading && friends.length === 0 && <Loading />}
            {!loading && friends.length === 0 && error && (
              <ColCenter className="h-full">
                <Heading verient="h1" mode={modeNatural}>
                  {error[0]}
                </Heading>
              </ColCenter>
            )}

            {!loading && filterfriend.length < 1 && (
              <ColCenter className="h-full">
                <Heading verient="h1" mode={modeNatural}>
                  No friend found
                </Heading>
              </ColCenter>
            )}

            {filterfriend.length >= 1 &&
              filterfriend.map((obj) => (
                <Friends
                  details={obj}
                  key={obj._id}
                  setCurrentFriend={setCurrentFriend}
                  checkActiveUser={checkActiveUser}
                  selectedFriend={selectedFriend}
                  setSelectedFriend={setSelectedFriend}
                  socketMessage={socketMessage}
                  setSocketMessage={setSocketMessage}
                  loginId={userInfo.id}
                  socket={socket}
                  mode={mode}
                  modeNatural={modeNatural}
                  modeBlue={modeBlue}
                  modeStone={modeStone}
                  setIsChatOpen={setIsChatOpen}
                  setOpenFriendDetails={setOpenFriendDetails}
                  setIsOpenSidebar={setIsOpenSidebar}
                  updateCount
                />
              ))}
          </ColGap>
        </Box>
      </ColGap>
    </Box>
  );
};

export default React.memo(SideBar);
