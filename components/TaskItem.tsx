import React from "react";
import { View } from "react-native";
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
  return (
    <View
      className="flex-row justify-between items-center"
      style={{
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ccc",
        borderRadius: 5,
      }}
    >
      <ThemedText style={{ textDecorationLine: item.completed ? "line-through" : "none" }}>{item.title}</ThemedText>
      <View className="flex-row">
        {updateTask && (
          <ThemedButton className="px-2" variant="ghost">
            <FontAwesome size={20} name="pencil" color={Colors.common.blue} onPress={() => updateTask(item.id)} />
          </ThemedButton>
        )}
        <ThemedButton className="px-2" variant="ghost">
          <FontAwesome size={20} name="trash" color={Colors.common.red} onPress={() => removeTask(item.id)} />
        </ThemedButton>
        <ThemedButton className="px-2" variant="ghost">
          <FontAwesome6
            size={20}
            name={!item.completed ? "check-circle" : "xmark"}
            color={Colors.common[item.completed ? "red" : "green"]}
            onPress={() => toggleTaskCompletion(item.id)}
          />
        </ThemedButton>
      </View>
    </View>
  );
};

export default TaskItem;
