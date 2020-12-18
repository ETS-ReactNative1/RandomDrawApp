import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import Menu from "./menu";
import Name from "./name";
import Number from "./number";
//import logo from "../assets/logo.png";

export default function screen(props) {
    const [showNum, setShowNum] = useState(1);
    const [prevShowNum, setPrevShowNum] = useState(0);

    if (showNum === 1) {
        return <Menu setShowNum={setShowNum} />;
    } else if (showNum === 2) {
        return <Name />;
    } else if (showNum === 3) {
        return <Number />;
    }
}

const styles = StyleSheet.create({
    container: {},
    button: {},
});
