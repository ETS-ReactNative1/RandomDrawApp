import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    TouchableOpacity,
    Image,
} from "react-native";
import { ceil } from "react-native-reanimated";
import back from "../assets/back.png";
//import logo from "../assets/logo.png";

const shuffle = (a) => {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
};

export default function screen(props) {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);

    const randomDraw = () => {
        if (max > min) {
            const l = max - min + 1;
            console.log(l);
            const data = Array(l)
                .fill()
                .map((item, index) => {
                    return Number(min) + index;
                });
            shuffle(data);
            props.navigation.navigate("NumDraw", {
                _data: data,
                _min: min,
                _max: max,
            });
        } else {
            const l = min - max + 1;
            const data = Array(l)
                .fill()
                .map((item, index) => {
                    return Number(max) + index;
                });
            shuffle(data);
            props.navigation.navigate("NumDraw", {
                _data: data,
                _min: max,
                _max: min,
            });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { margin: "3%", color: "orange" }]}
                keyboardType="numeric"
                placeholder="  0  "
                onChangeText={(num) => setMin(num)}
            />
            <Text style={[styles.text, { margin: "3%" }]}>부터</Text>
            <TextInput
                style={[styles.input, { margin: "3%", color: "indianred" }]}
                keyboardType="numeric"
                placeholder=" 1 0"
                onChangeText={(num) => setMax(num)}
            />
            <Text
                style={[styles.text, { marginTop: "3%", marginBottom: "7%" }]}
            >
                까지
            </Text>
            <TouchableOpacity onPress={randomDraw} style={styles.button}>
                <Text style={[styles.text, { margin: "3%" }]}>랜덤 뽑기 !</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.8,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        padding: "3%",
    },
    input: {
        fontFamily: "nanumpenB",
        fontSize: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },
    text: {
        fontFamily: "nanumpenB",
        fontSize: 30,
    },
});
