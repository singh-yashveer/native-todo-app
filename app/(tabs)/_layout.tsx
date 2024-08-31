import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: Colors[colorScheme ?? "light"].colors.tint, headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="todos"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list-ul" color={color} />,
        }}
      />
    </Tabs>
  );
}
