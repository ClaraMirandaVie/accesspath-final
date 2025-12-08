import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/AuthContext";
import Routes from "./src/routes/Routes";


export default function App() {
return (
<NavigationContainer>
<AuthProvider>
<Routes />
</AuthProvider>
</NavigationContainer>
);
}