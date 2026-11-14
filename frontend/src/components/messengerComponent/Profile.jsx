import Box from "../uiComponent/Box";
import React from "react";

const Profile = ({
  imgUrl = "",
  alt = "",
  active = false,
  veriants = "profile",
}) => {
  const base = ` rounded-full cursor-pointer relative`;
  const image = imgUrl;
  const style = {
    profile: `${base} h-12 w-12`,
    profileDetails: `${base} h-15 w-15 md:h-25 md:w-25 `,
    profileSeen: `${base} h-4 w-4`,
    profileList: `${base} h-10 w-10`,
  };
  return (
    <Box className={style[veriants]}>
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover rounded-full"
      />

      {active && (
        <Box className="h-2 w-2 rounded-full bg-green-700  -bottom-0.5 right-2   z-10 absolute"></Box>
      )}
    </Box>
  );
};
export default React.memo(Profile);
