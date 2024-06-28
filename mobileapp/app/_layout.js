import { Stack } from "expo-router";

export default RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
        }}
      />
      <Stack.Screen
        name="job/[id]"
        options={{
          headerTitle: "Job Details",
        }}
      />
      <Stack.Screen
        name="mapview/driving"
        options={{
          headerTitle: "Routing",
        }}
      />
      <Stack.Screen
        name="mapview/MapScreen"
        options={{
          headerTitle: "Location",
        }}
      />
    </Stack>
  );
};
