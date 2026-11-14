import { ColCenter } from "./Flex";
import Box from "./Box";

const Loader = ({ mode }) => {
  return (
    <Box className=" h-full " mode={mode}>
      <ColCenter className="h-full">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-stone-800 rounded-full animate-spin"></div>
      </ColCenter>
    </Box>
  );
};

export default Loader;
