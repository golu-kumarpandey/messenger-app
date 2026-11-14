// 📁 EmojiPicker.jsx
import React from "react";
import { useRef, useEffect } from "react";
import Box from "../uiComponent/Box";

const allEmozi = [
  "😊",
  "😂",
  "🤣",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "🥲",
  "😀",
  "😁",
  "😅",
  "😆",
  "🤩",
  "🥳",
  "😎",
  "🤓",
  "🧐",
  "🤗",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🤎",
  "💔",
  "👍",
  "👎",
  "👊",
  "✊",
  "🤛",
  "🤜",
  "👏",
  "🙌",
  "👐",
  "🤲",
  "🎁",
  "🎈",
  "🎉",
  "🎊",
  "🎀",
  "🎄",
  "🎃",
  "🎂",
  "🎇",
  "✨",
];

const EmojiPicker = ({
  onSlectEmogi,
  onClose,
  setInputValue,
  selectedEmoji,
  modeNatural,
}) => {
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Box
      ref={pickerRef}
      className="absolute bottom-full  flex-1 right-0 mb-2 z-50 md:w-[50%]"
      mode={modeNatural}
    >
      <Box className="rounded-lg  shadow-2xl border border-gray-700">
        <div className="flex justify-center  flex-row gap-1 w-full flex-wrap max-h-48 overflow-y-auto scrollbar-none">
          {allEmozi.map((emoji, index) => (
            <span
              key={index}
              onClick={() => {
                onSlectEmogi?.(emoji);
                onClose?.();
                setInputValue((prev) => prev + selectedEmoji);
              }}
              className="text-2xl cursor-pointer hover:bg-gray-700 hover:scale-125 p-1 rounded transition-all duration-200 text-white"
            >
              {emoji}
            </span>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default React.memo(EmojiPicker);
