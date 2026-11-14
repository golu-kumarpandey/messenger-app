import Profile from "./Profile";
import React from "react";
import {
  updateCurrentFriend,
  resetCount,
  seenMessage,
  seenAllMessage,
  updatedLastMessage,
} from "../../redux/mesengerSlice";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "timeago-react";
import { FaRegCheckCircle } from "react-icons/fa";
import { RowBetween, RowGap } from "../uiComponent/Flex";
import Box from "../uiComponent/Box";
import Heading from "../uiComponent/Heading";
import { customBorderBottom, getThemBackground } from "../../utils/helper";
import Button from "../uiComponent/Button";

const Friends = ({
  details,
  checkActiveUser,
  loginId,
  setSocketMessage,
  socket,
  modeNatural,
  setIsChatOpen,
  setOpenFriendDetails,
  setIsOpenSidebar,
}) => {
  const { userName, image, _id, lastMessage, count } = details;
  const themeBackground = getThemBackground(modeNatural);

  const dispatch = useDispatch();
  const { currentFriend } = useSelector((state) => state.messenger);

  const handleClick = () => {
    if (loginId === lastMessage?.reciverId && lastMessage.senderId === _id) {
      const updatedMessage = {
        ...lastMessage,
        status: "seen",
      };
      dispatch(seenMessage(updatedMessage));
      socket.current.emit("msgSeenSocket", updatedMessage);
      dispatch(resetCount(lastMessage));
      dispatch(
        seenAllMessage({
          reciverId: _id,
        }),
      );
      dispatch(updatedLastMessage(updatedMessage));
    }

    setIsChatOpen(true);
    setIsOpenSidebar(false);
    setOpenFriendDetails(false);
    dispatch(updateCurrentFriend(details));
    setSocketMessage("");
  };

  return (
    <Box
      className={`${currentFriend?._id === _id ? themeBackground : ""} hover:bg-neutral-600 py-2 px-1 cursor-pointer ${customBorderBottom} `}
      onClick={handleClick}
    >
      <RowGap className="gap-3 ">
        <Profile
          checkActiveUser={checkActiveUser}
          veriants="profileList"
          active={checkActiveUser(details._id)}
          imgUrl={`/image/${image}`}
        />
        <Box className="flex-1">
          <RowBetween className="flex justify-between items-center">
            <Heading verient="h2" mode={modeNatural}>
              {userName}
            </Heading>

            {lastMessage?.senderId === loginId ? (
              lastMessage.status === "seen" ? (
                <Profile
                  veriants="profileSeen"
                  imgUrl={`/image/${image}`}
                  size={"xs"}
                />
              ) : (
                <FaRegCheckCircle />
              )
            ) : (
              count > 0 && (
                <Button verient="sm" className="bg-green-500">
                  {count}
                </Button>
              )
            )}
          </RowBetween>

          {lastMessage ? (
            <RowGap>
              <Heading verient="p" mode={modeNatural}>
                {lastMessage.message?.text
                  ? `you: ${lastMessage.message.text}`
                  : lastMessage.message?.image
                    ? "📷 Photo"
                    : "No messages"}
              </Heading>
              {lastMessage.createdAt && (
                <TimeAgo
                  datetime={lastMessage.createdAt}
                  locale="en"
                  className="text-xs text-gray-500 flex-1 text-end "
                />
              )}
            </RowGap>
          ) : (
            <Heading verient="p" mode={modeNatural}>
              No Message Yet
            </Heading>
          )}
        </Box>
      </RowGap>
    </Box>
  );
};
export default React.memo(Friends);
