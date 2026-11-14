import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, setLocalStorage } from "../utils/helper";
const initialState = {
  mode: "dark",
  modeStone: "darkStone",
  modeBlue: "darkBlue",
  modeNatural: "darkNatural",
};

if (
  getLocalStorage("mode") &&
  getLocalStorage("modeStone") &&
  getLocalStorage("modeBlue") &&
  getLocalStorage("modeNatural")
) {
  initialState.mode = getLocalStorage("mode");
  initialState.modeStone = getLocalStorage("modeStone");
  initialState.modeBlue = getLocalStorage("modeBlue");
  initialState.modeNatural = getLocalStorage("modeNatural");
} else {
  setLocalStorage("mode", initialState.mode);
  setLocalStorage("modeStone", initialState.modeStone);
  setLocalStorage("modeBlue", initialState.modeBlue);
  setLocalStorage("modeNatural", initialState.modeNatural);
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state) {
      const mode = state.mode === "dark" ? "light" : "dark";
      const modeStone =
        state.modeStone === "darkStone" ? "lightStone" : "darkStone";
      const modeBlue = state.modeBlue === "darkBlue" ? "lightBlue" : "darkBlue";
      const modeNatural =
        state.modeNatural === "darkNatural" ? "lightNatural" : "darkNatural";
      state.mode = mode;
      state.modeStone = modeStone;
      state.modeBlue = modeBlue;
      state.modeNatural = modeNatural;
      setLocalStorage("mode", mode);
      setLocalStorage("modeStone", modeStone);
      setLocalStorage("modeBlue", modeBlue);
      setLocalStorage("modeNatural", modeNatural);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
