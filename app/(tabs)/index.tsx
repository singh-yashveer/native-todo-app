import TaskItem from "@/components/TaskItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { loadTasks, saveTasks } from "@/services/storage";
import { ContainerStyles } from "@/styles/commonStyles";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function Index() {
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

  const removeTask = async (id: string) => {
    setLoading(true);
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingTaskId === id) {
      setEditingTaskId(null);
    }
    setLoading(false);
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
        Completed Tasks
      </ThemedText>

      {tasks.length === 0 && (
        <ThemedText className="my-6" type="subtitle">
          No tasks found
        </ThemedText>
      )}

      <FlatList
        className="max-h-[30vh]"
        data={tasks.filter((task) => task.completed)}
        renderItem={(t) => <TaskItem item={t.item} removeTask={removeTask} toggleTaskCompletion={toggleTaskCompletion} />}
      />
    </ThemedView>
  );
}
