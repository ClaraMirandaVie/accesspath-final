import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Mapa from "./Mapa";
import Locais from "./Locais";
import Perfil from "./Perfil";


const Tab = createBottomTabNavigator();


export default function HomeTabs() {
return (
<Tab.Navigator screenOptions={{ headerShown: false }}>
<Tab.Screen name="Mapa" component={Mapa} />
<Tab.Screen name="Locais" component={Locais} />
<Tab.Screen name="Perfil" component={Perfil} />
</Tab.Navigator>
);
}