import React, { useCallback, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ContainerStyles } from "@/styles/commonStyles";
import { ThemedTextInput } from "@/components/TextInput";
import { ThemedButton } from "@/components/ThemedButton";
import { FlatList, ActivityIndicator, View } from "react-native";
import { loadTasks, saveTasks } from "@/services/storage";
import TaskItem from "@/components/TaskItem";
import { useFocusEffect } from "expo-router";

const Tasks = () => {
  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    const loadedTasks = await loadTasks();
    setTasks(loadedTasks);
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  useEffect(() => {
    if (!loading) saveTasks(tasks);
  }, [tasks]);

  const addTask = () => {
    if (todo.trim()) {
      setLoading(true);
      if (editingTaskId) {
        setTasks(tasks.map((task) => (task.id === editingTaskId ? { ...task, title: todo } : task)));
        setEditingTaskId(null);
      } else {
        setTasks([...tasks, { id: String(tasks.length + 1), title: todo, completed: false }]);
      }
      setLoading(false);
      setTodo("");
    }
  };

  const removeTask = async (id: string) => {
    setLoading(true);
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
      setTodo("");
    }
    setLoading(false);
  };

  const updateTask = (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setTodo(task.title);
      setEditingTaskId(id);
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  return (
    <ThemedView
      style={{
        ...ContainerStyles.flexCenterColumn,
        padding: 20,
      }}
    >
      <ThemedText className="my-6" type="title">
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
        {editingTaskId ? "Update Task" : "Add Task"}
      </ThemedButton>

      {tasks.length === 0 && (
        <ThemedText className="mt-4" type="subtitle">
          No active tasks
        </ThemedText>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <FlatList
            className="max-h-[30vh]"
            data={tasks.filter((task) => !task.completed)}
            renderItem={(t) => <TaskItem item={t.item} removeTask={removeTask} updateTask={updateTask} toggleTaskCompletion={toggleTaskCompletion} />}
          />
        </View>
      )}
    </ThemedView>
  );
};

export default Tasks;
