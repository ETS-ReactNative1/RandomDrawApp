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
//import logo from "../assets/logo.png";

export default function screen(props) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    props.setShowNum(2);
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                    }}
                >
                    name
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    props.setShowNum(3);
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                    }}
                >
                    number
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    button: {},
});
