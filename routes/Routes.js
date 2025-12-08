import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";


// screens
import AccountType from "../screens/AccountType";
import Login from "../screens/Login";
import Register from "../screens/Register";
import HomeTabs from "../screens/HomeTabs";


const Stack = createNativeStackNavigator();


export default function Routes() {
const { user } = useContext(AuthContext);


return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
{!user ? (
<>
<Stack.Screen name="AccountType" component={AccountType} />
<Stack.Screen name="Login" component={Login} />
<Stack.Screen name="Register" component={Register} />
</>
) : (
<Stack.Screen name="HomeTabs" component={HomeTabs} />
)}
</Stack.Navigator>
);
}