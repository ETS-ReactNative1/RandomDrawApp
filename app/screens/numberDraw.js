import React, { useEffect, useState, useRef, useMemo } from "react";
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
    const { _data, _min, _max } = props.route.params;
    const [duplicate, setDuplicate] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winList, setWinList] = useState([]);
    const [winNum, setWinNum] = useState("시작 ->");
    const [data, setData] = useState(_data);
    const [duplCnt, setDuplCnt] = useState(0);
    const [ableToClick, setAbleToClick] = useState(true);
    const numIndex = useRef(-1);

    const min = Number(_min);
    const max = Number(_max);

    const duplicateStyle = () => {
        if (duplicate) {
            return styles.isDuplicate;
        } else {
            return styles.isNotDuplicate;
        }
    };

    const drawWinNum = () => {
        return data[numIndex.current];
    };

    const pushList = () => {
        if (numIndex.current === -1) return;
        let list = winList;
        if (!duplicate) {
            const item = data.splice(numIndex.current, 1);
            list.push(item);
            setDuplCnt(duplCnt + 1);
        } else {
            list.push(data[numIndex.current]);
        }
        setWinList(list);
    };
    const dupBtn = () => {
        if (duplicate) return "중복 On";
        else return "중복 Off";
    };

    useEffect(() => {
        setData(data);
    }, [duplCnt]);

    useEffect(() => {
        console.log("useEffect");
        if (isSpinning === false) {
            pushList();
            return () => {
                clearInterval(timer);
            };
        }
        const timer = setInterval(() => {
            numIndex.current += 1;
            numIndex.current %= data.length;
            setWinNum(drawWinNum());
        }, 10);

        return () => {
            clearInterval(timer);
        };
    }, [isSpinning]);

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "nanumpenB",
                        fontSize: 20,
                    }}
                >
                    {min} 부터 {max} 까지 랜덤뽑기
                </Text>
            </View>
            <View style={{ flexDirection: "row", flex: 3 }}>
                <View
                    style={[
                        styles.button,
                        {
                            marginLeft: "10%",
                            marginVertical: "1.5%",
                            flex: 5,
                        },
                    ]}
                >
                    <Text style={{ fontFamily: "nanumpenB", fontSize: 50 }}>
                        {winNum}
                    </Text>
                </View>
                <View style={{ flex: 3 }}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                marginRight: "30%",
                                marginLeft: "10%",
                                marginVertical: "5%",
                                flex: 1,
                            },
                            duplicateStyle(),
                        ]}
                        onPress={() => {
                            if (ableToClick) {
                                setAbleToClick(false);
                                setDuplicate(!duplicate);
                                setAbleToClick(true);
                            }
                        }}
                    >
                        <Text>{dupBtn()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                marginRight: "30%",
                                marginLeft: "10%",
                                marginVertical: "5%",
                                flex: 2,
                            },
                        ]}
                        onPress={() => {
                            if (data.length !== 0 && ableToClick) {
                                setAbleToClick(false);
                                setIsSpinning(true);
                                setAbleToClick(true);
                            }
                        }}
                    >
                        <Text>돌려</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                marginRight: "30%",
                                marginLeft: "10%",
                                marginVertical: "5%",
                                flex: 2,
                            },
                        ]}
                        onPress={() => {
                            if (ableToClick) {
                                setAbleToClick(false);
                                setIsSpinning(false);
                                setAbleToClick(true);
                            }
                        }}
                    >
                        <Text>멈춰</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                style={{
                    flexDirection: "row-reverse",
                    flex: 1,
                    alignItems: "flex-end",
                    marginHorizontal: "10%",
                }}
            ></View>
            <View style={styles.show}>
                <FlatList
                    data={[...winList].reverse()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ margin: "2%" }}>
                                <Text
                                    style={{
                                        fontFamily: "nanumpenB",
                                        fontSize: 20,
                                    }}
                                >
                                    {item}
                                </Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    show: {
        flex: 6,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: "5%",
        marginHorizontal: "10%",
    },
    isDuplicate: {
        backgroundColor: "lightgreen",
    },
    isNotDuplicate: {
        backgroundColor: "lightcoral",
    },
});
