import { IoMdSend } from "react-icons/io";
import EmojiPicker from "./EmoziPicker";

import { useState, useEffect } from "react";
import { MdAttachFile } from "react-icons/md";
import { BsEmojiNeutral } from "react-icons/bs";
import Input from "../uiComponent/Input";
import Lable from "../uiComponent/Lable";
import Button from "../uiComponent/Button";
import { useSelector } from "react-redux";

import {
  postChat,
  postImageChat,
  resetSendSuccess,
  updatedLastMessage,
} from "../../redux/mesengerSlice";
import { useDispatch } from "react-redux";
import { RowGap } from "../uiComponent/Flex";
import InputBox from "../uiComponent/InputBox";

const SendMessage = ({ currentFriend, socket, playSound, modeNatural }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [cloaseEmozi, setCloaseEmoji] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { sendSuccessMessage, chats } = useSelector((state) => state.messenger);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!inputValue) return;
    socket.current?.emit("typing", {
      senderId: userInfo.id,
      reciverId: currentFriend?._id,
      message: inputValue,
    });
  }, [currentFriend?._id, socket, inputValue, userInfo?.id]);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleSend = () => {
    if (!inputValue) return;
    playSound();
    const chatDetails = {
      reciverId: currentFriend?._id,
      senderName: userInfo.userName,
      message: inputValue,
    };

    dispatch(postChat(chatDetails));
    setInputValue("");
    setSelectedEmoji("");
  };

  const handleFile = (e) => {
    playSound();
    const file = e.target.files[0];
    const newImageName = `${Math.floor(1000 + Math.random() * 9000)}${file.name}`;

    const formData = new FormData();
    formData.append("reciverId", currentFriend?._id);
    formData.append("message", file);
    formData.append("senderName", userInfo.userName);
    formData.append("newImageName", newImageName);
    dispatch(postImageChat(formData));
  };

  useEffect(() => {
    if (sendSuccessMessage) {
      console.log("send success message is runing");
      socket.current.emit("sendMessage", chats[chats?.length - 1]);
      dispatch(
        updatedLastMessage({
          ...chats[chats?.length - 1],
          status: "delevered",
        }),
      );
      dispatch(resetSendSuccess());
    }
  }, [sendSuccessMessage, socket, chats, dispatch, currentFriend?._id]);

  return (
    <RowGap>
      <InputBox mode={modeNatural}>
        {cloaseEmozi && (
          <EmojiPicker
            onSlectEmogi={setSelectedEmoji}
            setInputValue={setInputValue}
            onClose={setCloaseEmoji}
            selectedEmoji={selectedEmoji}
            modeNatural={modeNatural}
          />
        )}

        <Input
          type="search"
          placeholder="type here"
          value={inputValue}
          onChange={handleInputValue}
        />
        <RowGap>
          <Button
            verient="icon"
            className="bg-transparent"
            onClick={() => {
              console.log("handle emozi is working");
              setCloaseEmoji(true);
            }}
            mode={modeNatural}
          >
            <BsEmojiNeutral />
          </Button>
          <Input
            type="file"
            className="hidden"
            id="file"
            onChange={handleFile}
          />
          <Lable htmlFor="file">
            <MdAttachFile />
          </Lable>
        </RowGap>
      </InputBox>

      <Button verient="icon" type="send" onClick={handleSend}>
        <IoMdSend />
      </Button>
    </RowGap>
  );
};
export default SendMessage;
