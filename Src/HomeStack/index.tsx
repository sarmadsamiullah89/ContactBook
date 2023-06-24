import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../Screens/HomeScreen";
import ContactsScreen from "../Screens/Contacts";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                options={{
                    headerShown: false
                }}
                name="Home" component={Home} />
            <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        </Stack.Navigator>
    );
}

export default HomeStack;