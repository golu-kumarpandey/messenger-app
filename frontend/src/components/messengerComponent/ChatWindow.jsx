import Profile from "./Profile";
import React from "react";
import { FaRocketchat } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCall, MdVideoCall } from "react-icons/md";
import Button from "../uiComponent/Button";
import ChatMessage from "./ChatMessage";
import SendMessage from "./SendMessage";
import Box from "../uiComponent/Box";
import { ColGap, RowBetween, RowGap, ColCenter } from "../uiComponent/Flex";
import Heading from "../uiComponent/Heading";
import { customBorderBottom, customBorderRight } from "../../utils/helper";
import Loader from "../uiComponent/Loader";
// import TimeAgo from "timeago-react";

const ChatWindow = ({
  setIsChatOpen,
  setIsOpenSidebar,
  setOpenFriendDetails,
  openFriendDetails,
  currentFriend,
  checkActiveUser,
  socket,
  isTyping,
  playSound,
  typingData,
  modeNatural,
  loading,
  error,
  isChatOpen,
  isOpenSidebar,
}) => {
  const isOpenChatDetails = isChatOpen && !isOpenSidebar && !openFriendDetails;

  const handleClose = () => {
    setIsChatOpen(false);
    setIsOpenSidebar(true);
    setOpenFriendDetails(false);
  };
  const handleOpenDetails = () => {
    setIsChatOpen(false);
    setIsOpenSidebar(false);
    setOpenFriendDetails(true);
  };
  return (
    <Box
      className={`md:block  ${isOpenChatDetails ? "block" : "hidden"}  h-full flex-2  ${customBorderRight} p-1`}
    >
      {loading && !currentFriend ? (
        <Loader />
      ) : !loading && !currentFriend && error ? (
        <ColCenter className="h-full">
          <Heading verient="h2" mode={modeNatural}>
            {error[0]}
          </Heading>
        </ColCenter>
      ) : (
        <ColGap className="h-full">
          <RowBetween className={`${customBorderBottom} py-1`}>
            <Box>
              <RowGap>
                <Button
                  verient="icon"
                  mode={modeNatural}
                  onClick={handleClose}
                  className="block md:hidden"
                >
                  <IoMdArrowRoundBack />
                </Button>
                <Box
                  role="button"
                  onClick={handleOpenDetails}
                  className="cursor-pointer"
                >
                  <RowGap>
                    <Profile
                      imgUrl={`/image/${currentFriend?.image}`}
                      active={checkActiveUser(currentFriend?._id)}
                      loading={loading}
                      currentFriend={currentFriend}
                    />
                    <Box>
                      <Heading mode={modeNatural}>
                        {currentFriend?.userName}
                      </Heading>
                      {checkActiveUser(currentFriend?._id) && (
                        <Heading
                          verient="p"
                          className="text-green-600 text-center font-semibold first-letter:lowercase "
                        >
                          online
                        </Heading>
                      )}
                    </Box>
                  </RowGap>
                </Box>
              </RowGap>
            </Box>
            <RowGap>
              <Button
                type="icon"
                verient="icon"
                className="h-10 w-10"
                mode={modeNatural}
              >
                <MdCall />
              </Button>

              <Button
                type="icon"
                className="h-10 w-10"
                verient="icon"
                mode={modeNatural}
              >
                <MdVideoCall />
              </Button>

              <Button
                type="icon"
                className="h-10 w-10"
                verient="icon"
                mode={modeNatural}
                onClick={() => {
                  setOpenFriendDetails((prev) => !prev);
                  setIsChatOpen(false);
                  setIsOpenSidebar(false);
                }}
              >
                <FaRocketchat />
              </Button>
            </RowGap>
          </RowBetween>
          <ChatMessage
            currentFriend={currentFriend}
            isTyping={isTyping}
            typingData={typingData}
            modeNatural={modeNatural}
            isChatOpen={isChatOpen}
          />
          <SendMessage
            currentFriend={currentFriend}
            socket={socket}
            playSound={playSound}
            modeNatural={modeNatural}
          />
        </ColGap>
      )}
    </Box>
  );
};

export default React.memo(ChatWindow);
