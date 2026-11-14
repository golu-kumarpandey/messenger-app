import Box from "../uiComponent/Box";
import { useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";

const Galary = ({ mode }) => {
  const { chats } = useSelector((state) => state.messenger);

  const filterChat = chats.filter((chat) => chat.message.image !== "");
  console.log(filterChat);
  return (
    <>
      {filterChat.length < 1 ? (
        <ErrorMessage>No Image Found</ErrorMessage>
      ) : (
        <Box className="grid grid-cols-4 md:grid-cols-3 gap-1 py-2">
          {filterChat.map((chat) => (
            <Box className="py-1 px-2 h-20 bg-gray-600" mode={mode}>
              {chat.message.image && (
                <img
                  className="h-full w-full object-cover"
                  src={`public/image/${chat.message.image}`}
                  alt="Image"
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};
export default Galary;
