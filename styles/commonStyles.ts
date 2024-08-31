import { StyleSheet } from "react-native";

const ContainerStyles = StyleSheet.create({
  flexCenterRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenterColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  flexCenterRowSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexCenterColumnSpaceBetween: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export { ContainerStyles };
