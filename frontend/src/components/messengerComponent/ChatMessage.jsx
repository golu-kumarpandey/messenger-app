import Profile from "./Profile";
import React from "react";
import { useSelector } from "react-redux";
import { formateDate } from "../../utils/helper";
import { useEffect, useRef } from "react";
import Loader from "../uiComponent/Loader";
import TimeAgo from "timeago-react";
import { FaRegCheckCircle } from "react-icons/fa";
import Box from "../uiComponent/Box";
import Heading from "../uiComponent/Heading";
import {
  ColCenter,
  ColEnd,
  ColGap,
  ColStart,
  RowEnd,
  RowGap,
  RowStart,
} from "../uiComponent/Flex";
import ErrorMessage from "./ErrorMessage";

const ChatMessage = ({
  currentFriend,
  isTyping,
  typingData,
  modeNatural,
  isOpenChat,
}) => {
  const { chats, loading, error, responseChatId } = useSelector(
    (state) => state.messenger,
  );
  const { userInfo } = useSelector((state) => state.user);
  const scrollRef = useRef();

  console.log(chats, loading, error);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats, isTyping, isOpenChat]);

  // Image component with fixed size
  const ChatImage = ({ src, alt }) => (
    <Box className="w-48 h-48 flex items-center justify-center overflow-hidden rounded-lg">
      <img
        src={`/image/${src}`}
        alt={alt || "chat image"}
        className="w-full h-full object-cover"
      />
    </Box>
  );

  if (loading && !responseChatId) return <Loader />;
  if (!loading && error)
    return (
      <ErrorMessage>
        <Heading verient="h2" mode={modeNatural}>
          {error[error]}
        </Heading>
      </ErrorMessage>
    );

  return (
    <>
      <Box
        className=" flex-1 p-2 overflow-y-auto scrollbar-none cursor-pointer"
        ref={scrollRef}
      >
        <ColGap className="gap-2 md:gap-3 h-full">
          {chats?.length > 0 ? (
            chats?.map((m, index) => {
              const isCurrentUser = m?.senderId === userInfo?.id;
              const messageContent =
                m.message.text !== "" ? (
                  <Heading
                    verient="p"
                    mode={modeNatural}
                    className="text-right "
                  >
                    {m.message.text}
                  </Heading>
                ) : (
                  <ChatImage src={m.message.image} />
                );

              return isCurrentUser ? (
                <ColEnd key={index}>
                  <Box
                    mode={modeNatural}
                    className="max-w-[70%] rounded-b-3xl rounded-tl-3xl py-2 px-3 shadow"
                  >
                    {messageContent}

                    <RowEnd className="gap-0 mt-1">
                      <Heading verient="span" mode={modeNatural}>
                        {formateDate(m.createdAt)}
                      </Heading>
                      {m.status === "seen" ? (
                        <Profile
                          veriants="profileSeen"
                          imgUrl={`/image/${currentFriend?.image}`}
                        />
                      ) : (
                        <FaRegCheckCircle />
                      )}
                    </RowEnd>
                  </Box>
                </ColEnd>
              ) : (
                <ColStart>
                  <Box key={index} className=" max-w-[70%]">
                    <RowGap className="items-start">
                      <Profile
                        veriants="profileSeen"
                        imgUrl={`/image/${currentFriend?.image}`}
                      />

                      <Box
                        mode={modeNatural}
                        className=" rounded-b-3xl rounded-tr-3xl px-4 py-2"
                      >
                        <Heading verient="p" mode={modeNatural}>
                          {messageContent}
                        </Heading>
                        <Heading verient="span" mode={modeNatural}>
                          {formateDate(m.createdAt)}
                        </Heading>
                      </Box>
                    </RowGap>
                  </Box>
                </ColStart>
              );
            })
          ) : (
            <ColCenter className="h-full">
              <Profile
                veriants="profileDetails"
                imgUrl={`/image/${currentFriend?.image}`}
                currentFriend={currentFriend}
              />
              <Heading verient="h2" mode={modeNatural}>
                {currentFriend?.userName} connected
              </Heading>
              <TimeAgo datetime={currentFriend?.createdAt} />
            </ColCenter>
          )}

          {typingData &&
            typingData.senderId === currentFriend?._id &&
            typingData.reciverId === userInfo.id &&
            isTyping && (
              <Box className="max-w-[70%]">
                <RowStart>
                  <Profile
                    veriants="profileSeen"
                    imgUrl={`/image/${currentFriend?.image}`}
                  />

                  <Box
                    mode={modeNatural}
                    className={`rounded-b-3xl rounded-tr-3xl px-4 py-2`}
                  >
                    <Heading mode={modeNatural} verient="p">
                      typing..
                    </Heading>
                  </Box>
                </RowStart>
              </Box>
            )}
        </ColGap>
      </Box>
    </>
  );
};

export default React.memo(ChatMessage);
