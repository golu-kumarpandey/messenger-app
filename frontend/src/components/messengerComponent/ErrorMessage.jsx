import { ColCenter } from "../uiComponent/Flex";
import Heading from "../uiComponent/Heading";
import Box from "../uiComponent/Box";

const ErrorMessage = ({ mode = null, children }) => {
  return (
    <Box mode={mode} class="flex-1">
      <ColCenter className="h-full">
        <Heading mode={mode} verient="h2">
          {children}
        </Heading>
      </ColCenter>
    </Box>
  );
};
export default ErrorMessage;
