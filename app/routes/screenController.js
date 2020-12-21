import React, { useState } from "react";
import { View, Text, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Menu from "../screens/menu.js";
import Name from "../screens/name.js";
import Num from "../screens/number.js";
import NameDraw from "../screens/nameDraw";
import NumDraw from "../screens/numberDraw";

//import logo from "../assets/logo.png";

const Stack = createStackNavigator();

function App() {
    return (
        <View style={{ width: "100%", height: "90%" }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Menu">
                    <Stack.Screen
                        name="Menu"
                        component={Menu}
                        options={{
                            title: "랜덤뽑기!",
                            headerTitleStyle: {
                                fontFamily: "nanumpenB",
                                textAlign: "center",
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Name"
                        component={Name}
                        options={{
                            title: "이름으로 랜덤뽑기!",
                            headerTitleStyle: {
                                fontFamily: "nanumpenB",
                                textAlign: "center",
                            },
                        }}
                    />
                    <Stack.Screen
                        name="Num"
                        component={Num}
                        options={{
                            title: "숫자로 랜덤뽑기!",
                            headerTitleStyle: {
                                fontFamily: "nanumpenB",
                                textAlign: "center",
                            },
                        }}
                    />
                    <Stack.Screen
                        name="NameDraw"
                        component={NameDraw}
                        options={{
                            title: "과연 결과는..?",
                            headerTitleStyle: {
                                fontFamily: "nanumpenB",
                                textAlign: "center",
                            },
                        }}
                    />
                    <Stack.Screen
                        name="NumDraw"
                        component={NumDraw}
                        options={{
                            title: "과연 결과는2..?",
                            headerTitleStyle: {
                                fontFamily: "nanumpenB",
                                textAlign: "center",
                            },
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

export default App;
