import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";

export default function screen(props) {
    const { _group, _members } = props.route.params;
    const [duplicate, setDuplicate] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winList, setWinList] = useState([]);
    const [winNum, setWinNum] = useState("시작 ->");
    const [data, setData] = useState(_members);
    const [duplCnt, setDuplCnt] = useState(0);
    const [ableToClick, setAbleToClick] = useState(true);
    const numIndex = useRef(-1);

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
        let list = [...winList];
        if (!duplicate) {
            let _data = [...data];
            const item = _data.splice(numIndex.current, 1);
            list.push(item);
            setData(_data);
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

    const setFont = (isFirst) => {
        if (isFirst === 0) {
            return {
                fontFamily: "nanumpenB",
                fontSize: 30,
            };
        } else {
            return {
                fontFamily: "nanumpenB",
                fontSize: 20,
            };
        }
    };

    useEffect(() => {
        setData(data);
    }, [duplCnt]);

    useEffect(() => {
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
                    {_group} 랜덤뽑기
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
                            backgroundColor: "#fffff3",
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
                        <Text style={styles.defaultFont}>{dupBtn()}</Text>
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
                        <Text style={styles.largerFont}>돌 려</Text>
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
                        <Text style={styles.largerFont}>멈 춰</Text>
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
                                <Text style={setFont(index)}>{item}</Text>
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
    container: { flex: 1, backgroundColor: "#fffff8" },
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
        backgroundColor: "#fffff3",
    },
    isDuplicate: {
        backgroundColor: "lightgreen",
    },
    isNotDuplicate: {
        backgroundColor: "lightcoral",
    },
    defaultFont: {
        fontFamily: "nanumpenB",
        fontSize: 15,
    },
    largerFont: {
        fontFamily: "nanumpenB",
        fontSize: 19,
    },
});
