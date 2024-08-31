const tintColorLight = "#f561c4";
const tintColorDark = "#9377f6";

export const Colors = {
  light: {
    dark: false,
    colors: {
      tint: tintColorLight,
      icon: "#687076",
      tabIconDefault: "#687076",
      tabIconSelected: tintColorLight,
      primary: "#240986",
      secondary: "#f561c4",
      background: "#ece7fd",
      card: "#ece7fd",
      text: "#0a0326",
      border: "#ece7fd",
      notification: "rgb(255, 59, 48)",
    },
  },
  dark: {
    dark: true,
    colors: {
      tint: tintColorDark,
      icon: "#9BA1A6",
      tabIconDefault: "#9BA1A6",
      tabIconSelected: tintColorDark,
      primary: "#9e0a6d",
      secondary: "#9377f6",
      background: "#070218",
      text: "#e0d9fc",
      card: "#070218",
      border: "#070218",
      notification: "rgb(255, 69, 58)",
    },
  },
  common: {
    red: "#ff0000",
    blue: "#00bfff",
  },
};
