import SideBar from "../components/messengerComponent/SideBar";
import ChatWindow from "../components/messengerComponent/ChatWindow";
import ChatDetails from "../components/messengerComponent/ChatDetails";
import sendingSound from "../audio/sending.mp3";
import notificationSound from "../audio/notification.mp3";

import { io } from "socket.io-client";
import useSound from "use-sound";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import React from "react";
import {
  getFriends,
  getChat,
  addNewChat,
  updateDeleveredChat,
  updatedLastMessage,
  seenMessage,
  deleveredMessage,
  updateCount,
  resetCount,
  updateSeenChat,
  addFriendToList,
  clearNewFriend,
} from "../redux/mesengerSlice";
import toast from "react-hot-toast";
import Container from "../components/uiComponent/Container";
import { Flex } from "../components/uiComponent/Flex";

const Messenger = () => {
  const socket = useRef();

  const [playSound] = useSound(sendingSound);
  const [playNotification] = useSound(notificationSound);

  const { friends, currentFriend, loading, error, newFriend } = useSelector(
    (state) => state.messenger,
  );
  const Stablefriend = useMemo(() => {
    return friends;
  }, [friends]);

  const stableCurrentFriend = useMemo(() => {
    return currentFriend;
  }, [currentFriend]);

  const { userInfo } = useSelector((state) => state.user);
  const { mode, modeStone, modeBlue, modeNatural } = useSelector(
    (state) => state.theme,
  );

  const [activeUser, setActiveUser] = useState([]);

  const [socketMessage, setSocketMessage] = useState();
  const [typingData, setTypingData] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const [openFriendDetails, setOpenFriendDetails] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsOpenSidebar] = useState(true);
  // const navigate = useNavigate();
  const bellow768ref = useRef(true);

  const dispatch = useDispatch();

  const checkActiveUser = (id) => {
    if (!id || activeUser.length == 0) return false;
    console.log(activeUser, id, "active euser");
    return activeUser.some((u) => u.userId === id);
  };

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    if (stableCurrentFriend?._id) {
      dispatch(getChat(stableCurrentFriend?._id));
    }
  }, [dispatch, stableCurrentFriend?._id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        if (bellow768ref.current) {
          setIsChatOpen(false);
          setIsOpenSidebar(true);
          bellow768ref.current = false;
        }
      } else {
        if (!bellow768ref.current) {
          setIsChatOpen(false);
          setIsOpenSidebar(false);
          setOpenFriendDetails(false);
          bellow768ref.current = true;

          if (socketMessage !== "") {
            dispatch(seenMessage(socketMessage));
            dispatch(
              updatedLastMessage({
                ...socketMessage,
                status: "seen",
              }),
            );

            dispatch(resetCount(socketMessage));
            socket.current.emit("msgSeenSocket", {
              ...socketMessage,
              status: "seen",
            });
          }
          setSocketMessage("");
        }
      }
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function (removes event listener)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch, socketMessage]);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io("http://localhost:8000");

      socket.current.on("connect", () => {
        // user data sends to sockets
        socket.current.emit("addUser", userInfo?.id, userInfo);

        // login user get
        socket.current.on("getUser", (user) => {
          const filterUser = user.filter((u) => u.userId !== userInfo.id);
          setActiveUser(filterUser);
        });

        if (newFriend !== null) {
          socket.current.emit("addSocketFriendToList", newFriend);
          dispatch(clearNewFriend());
        }

        socket.current.on("addSocketResponseToList", (user) => {
          dispatch(addFriendToList(user));
          dispatch(clearNewFriend());
        });

        //get user message
        socket.current.on("getMessage", (message) => {
          setSocketMessage(message);
        });
        //typing
        socket.current.on("typing", (data) => {
          if (data) {
            setIsTyping(true);
            setTypingData(data);
          } else {
            setIsTyping(false);
            setTypingData(null);
          }
        });

        //seen message response socket
        socket.current.on("msgResponseSeenSocket", (data) => {
          dispatch(
            updatedLastMessage({
              ...data,
              status: "seen",
            }),
          );
          dispatch(updateSeenChat("seen"));
          dispatch(resetCount(data));
        });

        // deleverd message  socket
        socket.current.on("msgResponseDeleveredSocket", (data) => {
          dispatch(updatedLastMessage(data));
          dispatch(updateCount(data));
          dispatch(updateDeleveredChat("delevered"));
        });
        socket.current.on("disconnect", () => {
          console.log("user dissconnected");
        });
      });
    }
  }, [userInfo, currentFriend?._id, socketMessage, newFriend, dispatch]);

  // Register the user when auth data becomes available after socket connect.
  useEffect(() => {
    if (socket.current?.connected && userInfo?.id) {
      socket.current.emit("addUser", userInfo.id, userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (socketMessage && stableCurrentFriend) {
      if (
        (isChatOpen || !bellow768ref.current) &&
        socketMessage.senderId === stableCurrentFriend?._id &&
        socketMessage.reciverId === userInfo.id
      ) {
        dispatch(addNewChat(socketMessage));
        dispatch(seenMessage(socketMessage));

        dispatch(
          updatedLastMessage({
            ...socketMessage,
            status: "seen",
          }),
        );

        dispatch(resetCount(socketMessage));
        socket.current.emit("msgSeenSocket", {
          ...socketMessage,
          status: "seen",
        });
      }

      if (
        (!isChatOpen || socketMessage.senderId !== stableCurrentFriend?._id) &&
        socketMessage.reciverId === userInfo.id
      ) {
        playNotification();
        toast.success(`${socketMessage.senderName} sendeing new message`);
        dispatch(deleveredMessage(socketMessage));

        // socket me update karne  ke liy
        socket.current.emit("msgDeleveredSocket", {
          ...socketMessage,
          status: "delevered",
        });

        // reducer ko update karne  ke liy
        dispatch(
          updatedLastMessage({
            ...socketMessage,
            status: "delevered",
          }),
        );

        // last chat update karne ke liy

        dispatch(updateCount(socketMessage));
      }
    }
  }, [
    socketMessage,
    stableCurrentFriend,
    userInfo,
    dispatch,
    playNotification,
    isChatOpen,
  ]);

  useEffect(() => {
    let timerId = null;
    if (isTyping) {
      timerId = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
    return () => clearTimeout(timerId);
  }, [isTyping]);

  return (
    <Container mode={mode}>
      <Flex className="flex-col h-full md:flex-row">
        <SideBar
          friends={Stablefriend}
          checkActiveUser={checkActiveUser}
          setSocketMessage={setSocketMessage}
          socketMessage={socketMessage}
          socket={socket}
          mode={mode}
          modeBlue={modeBlue}
          modeStone={modeStone}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          openFriendDetails={openFriendDetails}
          setOpenFriendDetails={setOpenFriendDetails}
          setIsOpenSidebar={setIsOpenSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        <ChatWindow
          currentFriend={currentFriend}
          setOpenFriendDetails={setOpenFriendDetails}
          checkActiveUser={checkActiveUser}
          socket={socket}
          isTyping={isTyping}
          typingData={typingData}
          playSound={playSound}
          modeNatural={modeNatural}
          openFriendDetails={openFriendDetails}
          loading={loading}
          error={error}
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          setIsOpenSidebar={setIsOpenSidebar}
          isSidebarOpen={isSidebarOpen}
        />

        {openFriendDetails && (
          <ChatDetails
            currentFriend={currentFriend}
            checkActiveUser={checkActiveUser}
            modeNatural={modeNatural}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
            openFriendDetails={openFriendDetails}
            setOpenFriendDetails={setOpenFriendDetails}
            setIsOpenSidebar={setIsOpenSidebar}
            isSidebarOpen={isSidebarOpen}
          />
        )}
      </Flex>
    </Container>
  );
};

export default React.memo(Messenger);
