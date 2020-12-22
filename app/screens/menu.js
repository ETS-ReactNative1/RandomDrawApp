import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import back from "../assets/back.png";
//import logo from "../assets/logo.png";

export default function screen(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Name")}
                style={styles.button}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "nanumpenB",
                    }}
                >
                    이름으로 랜덤뽑기!
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate("Num")}
                style={styles.button}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontFamily: "nanumpenB",
                    }}
                >
                    숫자로 랜덤뽑기!
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffff8",
    },
    button: {
        width: "60%",
        height: "10%",
        borderColor: "black",
        backgroundColor: "#fafadd",
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
});
