import React, { ReactNode } from "react";
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ButtonVariant = "primary" | "secondary" | "outlined" | "ghost";

export type ThemedButtonProps = TouchableOpacityProps & {
  children: ReactNode;
  variant?: ButtonVariant;
  lightColor?: string;
  darkColor?: string;
  textColor?: string;
};

const getBackgroundColor = (variant: ButtonVariant, lightColor?: string, darkColor?: string) => {
  if (variant === "outlined" || variant === "ghost") {
    return "transparent";
  }

  return useThemeColor({ light: lightColor, dark: darkColor }, variant);
};

const getTextColor = (variant: ButtonVariant, textColor?: string) => {
  if (variant === "outlined" || variant === "ghost") {
    return useThemeColor({ light: textColor, dark: textColor }, "primary");
  }
  return useThemeColor({ light: textColor, dark: textColor }, "card");
};

const getBorderColor = (variant: ButtonVariant, lightColor?: string, darkColor?: string) => {
  if (variant === "outlined") {
    return useThemeColor({ light: lightColor, dark: darkColor }, "primary");
  }
  return undefined;
};

export function ThemedButton({ children, variant = "primary", lightColor, darkColor, textColor, style, ...rest }: ThemedButtonProps) {
  const backgroundColor = getBackgroundColor(variant, lightColor, darkColor);
  const color = getTextColor(variant, textColor);
  const borderColor = getBorderColor(variant, lightColor, darkColor);

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, borderColor }, variant === "outlined" && styles.outlined, variant === "ghost" && styles.ghost, style]}
      {...rest}
    >
      <Text style={[styles.buttonText, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  outlined: {
    borderWidth: 2,
  },
  ghost: {
    borderWidth: 0,
  },
});
