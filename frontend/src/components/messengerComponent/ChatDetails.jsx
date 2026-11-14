import Profile from "./Profile";
import React from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import Button from "../uiComponent/Button";
import Box from "../uiComponent/Box";
import Heading from "../uiComponent/Heading";
import { ColCenter, ColGap, RowCenter } from "../uiComponent/Flex";
import Galary from "./Galary";
import TimeAgo from "timeago-react";
import { useState } from "react";

const ChatDetails = ({
  setIsChatOpen,
  isChatOpen,
  setIsOpenSidebar,
  isOpenSidebar,
  setOpenFriendDetails,
  openFriendDetails,
  currentFriend,
  checkActiveUser,
  modeNatural,
}) => {
  const handleClose = () => {
    setIsChatOpen(true);
    setOpenFriendDetails(false);
    setIsOpenSidebar(false);
  };
  const isOpenChatDetails = openFriendDetails && !isChatOpen && !isOpenSidebar;
  const [isOpenMedia] = useState(true);
  return (
    <Box
      className={`${isOpenChatDetails ? "block" : "hidden"} md:block h-full  py-3 px-2`}
    >
      <Button
        verient="icon"
        onClick={handleClose}
        mode={modeNatural}
        ml={false}
        className="md:hidden"
      >
        <MdArrowBack />
      </Button>

      <ColGap className="h-full gap-3">
        <ColCenter>
          <Profile
            checkActiveUser={checkActiveUser}
            veriants="profileDetails"
            imgUrl={`image/${currentFriend?.image}`}
          />

          {checkActiveUser(currentFriend._id) && (
            <Heading veriants="p" className="text-green-600">
              online
            </Heading>
          )}
          <Heading verient="h2" mode={modeNatural}>
            {currentFriend?.userName} connected
          </Heading>
          <TimeAgo datetime={currentFriend?.createdAt} />
        </ColCenter>

        <RowCenter className="w-full">
          <Heading verient="h2" mode={modeNatural}>
            See Details
          </Heading>
          <Button verient="icon" mode={modeNatural}>
            <IoMdArrowDropdownCircle />
          </Button>
        </RowCenter>

        <RowCenter className="w-full">
          <Heading verient="h2" mode={modeNatural}>
            Privicy and support
          </Heading>
          <Button verient="icon" mode={modeNatural}>
            <IoMdArrowDropdownCircle />
          </Button>
        </RowCenter>

        <RowCenter className="w-full">
          <Heading verient="h2" mode={modeNatural}>
            shared media
          </Heading>
          <Button verient="icon" mode={modeNatural}>
            <IoMdArrowDropdownCircle />
          </Button>
        </RowCenter>
        {isOpenMedia && <Galary mode={modeNatural} />}
      </ColGap>
    </Box>
  );
};
export default React.memo(ChatDetails);
