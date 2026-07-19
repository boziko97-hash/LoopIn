import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { I18nManager } from "react-native";

import { C } from "./src/theme/colors";
import HomeScreen from "./src/screens/HomeScreen";
import ExerciseListScreen from "./src/screens/ExerciseListScreen";
import TimerScreen from "./src/screens/TimerScreen";

// دعم الاتجاه من اليمين لليسار (RTL) للتطبيق العربي
try {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
} catch (e) {
  /* ignore on platforms where this isn't supported */
}

const Stack = createNativeStackNavigator();

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: C.bg,
    card: C.bg,
    text: C.text,
    border: C.border,
    primary: C.lime,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={C.bg} />
      <NavigationContainer theme={NavTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: C.bg },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
          <Stack.Screen name="Timer" component={TimerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
