import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ContainerStyles } from "@/styles/commonStyles";
import { ThemedTextInput } from "@/components/TextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { FlatList, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Todos = () => {
  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<{ id: string; title: string }[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  function addTask() {
    if (todo.trim().length > 0) {
      if (editingTaskId) {
        setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...task, title: todo } : task)));
        setEditingTaskId(null); // Reset after updating
      } else {
        setTasks([...tasks, { id: String(tasks.length + 1), title: todo }]);
      }
      setTodo("");
    }
  }

  function removeTask(id: string) {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null); // Reset if deleting the task being edited
      setTodo("");
    }
  }

  function updateTask(id: string) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTodo(task.title); // Set the task title in the input for editing
      setEditingTaskId(id); // Set the editing task ID
    }
  }

  return (
    <ThemedView
      style={{
        ...ContainerStyles.flexCenterColumn,
        padding: 20,
      }}
    >
      <ThemedText className="mb-4" type="subtitle">
        Tasks
      </ThemedText>
      <ThemedTextInput
        className="h-14"
        placeholder="Add a task"
        value={todo}
        onChange={(event) => {
          setTodo(event.nativeEvent.text);
        }}
      />

      <ThemedButton className="my-4 w-full" variant={"secondary"} onPress={addTask}>
        {editingTaskId ? "Update Task" : "Add Task"} {/* Update button text */}
      </ThemedButton>

      <FlatList
        className="max-h-[60vh]"
        data={tasks}
        renderItem={(t) => <RenderTask item={t.item} removeTask={removeTask} updateTask={updateTask} />}
      />
    </ThemedView>
  );
};

export default Todos;

const RenderTask = ({
  item,
  removeTask,
  updateTask,
}: {
  item: { id: string; title: string };
  removeTask: (id: string) => void;
  updateTask: (id: string) => void;
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
      <ThemedText>{item.title}</ThemedText>
      <View className="flex-row">
        <ThemedButton className="px-2" variant="ghost">
          <FontAwesome size={20} name="pencil" color={Colors.common.blue} onPress={() => updateTask(item.id)} />
        </ThemedButton>
        <ThemedButton className="px-2" variant="ghost">
          <FontAwesome size={20} name="trash" color={Colors.common.red} onPress={() => removeTask(item.id)} />
        </ThemedButton>
      </View>
    </View>
  );
};
