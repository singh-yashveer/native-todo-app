import React, { useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const TaskItem = ({
  item,
  removeTask,
  updateTask,
  toggleTaskCompletion,
}: {
  item: { id: string; title: string; completed: boolean };
  removeTask: (id: string) => void;
  updateTask?: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const buttonScale = useRef(new Animated.Value(1)).current;

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleRemoveTask = (id: string) => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      removeTask(id);
    });
  };

  return (
    <Animated.View
      style={{
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 5,
        opacity: fadeAnim,
        transform: [{ translateX }],
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <ThemedText style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>{item.title}</ThemedText>
        <View style={{ flexDirection: "row" }}>
          {updateTask && (
            <ThemedButton
              style={{ transform: [{ scale: buttonScale }] }}
              variant="ghost"
              onPress={() => {
                animateButtonPress();
                updateTask(item.id);
              }}
            >
              <FontAwesome size={20} name="pencil" color={Colors.common.blue} />
            </ThemedButton>
          )}
          <ThemedButton
            style={{ transform: [{ scale: buttonScale }] }}
            variant="ghost"
            onPress={() => {
              animateButtonPress();
              handleRemoveTask(item.id);
            }}
          >
            <FontAwesome size={20} name="trash" color={Colors.common.red} />
          </ThemedButton>
          <ThemedButton
            style={{ transform: [{ scale: buttonScale }] }}
            variant="ghost"
            onPress={() => {
              animateButtonPress();
              toggleTaskCompletion(item.id);
            }}
          >
            <FontAwesome6 size={20} name={!item.completed ? "check-circle" : "xmark"} color={Colors.common[item.completed ? "red" : "green"]} />
          </ThemedButton>
        </View>
      </View>
    </Animated.View>
  );
};

export default TaskItem;
