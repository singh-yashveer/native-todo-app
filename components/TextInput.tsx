import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTextInput({ style, lightColor, darkColor, ...rest }: ThemedTextInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");
  const textColor = useThemeColor({}, "text");
  const placeholderColor = useThemeColor({}, "icon");

  return <TextInput style={[{ backgroundColor, color: textColor }, styles.input, style]} placeholderTextColor={placeholderColor} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    fontSize: 16,
  },
});
