import { RowGap } from "./Flex";
import Box from "./Box";

const InputBox = ({ children, className, mode, ring = false }) => {
  return (
    <Box
      mode={mode}
      className={`relative w-full text-xl py-1 px-1 rounded-xl ${ring ? "focus-within:ring focus-within:ring-blue-500 focus-within:ring-offset-1" : ""} ${className}`}
    >
      <RowGap>{children}</RowGap>
    </Box>
  );
};
export default InputBox;
