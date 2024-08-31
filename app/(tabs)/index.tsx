import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={"/todos"}>
            <ThemedText>Home</ThemedText>
          </Link>
          <ThemedText className="">Edit app/index.tsx to edit this screen.</ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
