import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    a,
} from "react-native";
import AppLoading from "expo-app-loading";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
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
    const [groupData, setGroupData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [itemAddModalVisible, setItemAddModalVisible] = useState(false);
    const [itemEditModalVisible, setItemEditModalVisible] = useState(false);
    const [itemDeleteModalVisible, setItemDeleteModalVisible] = useState(false);
    const [groupAddModalVisible, setGroupAddModalVisible] = useState(false);
    const [groupDeleteModalVisible, setGroupDeleteModalVisible] = useState(
        false
    );
    const [members, setMembers] = useState([]);
    const [addItem, setAddItem] = useState("");
    const [selectedItemIndex, setSelectedItemIndex] = useState(undefined);

    const addGroupList = (group) => {
        const list = [...groupData, group];
        setGroupData(list);
        AsyncStorage.setItem("groupList", JSON.stringify(list));
    };

    const removeGroupList = (groupIndex) => {
        //AsyncStorage.clear();
        if (groupData.length === 1) {
            console.log("삭제 실패");
        } else {
            let list = [...groupData];
            list.splice(groupIndex, 1);
            setGroupData(list);
            AsyncStorage.setItem("groupList", JSON.stringify(list));
        }
    };
    const addItemList = (groupIndex, item) => {
        let list = [...groupData];
        list[groupIndex]["members"].push(item);
        setGroupData(list);
        AsyncStorage.setItem("groupList", JSON.stringify(list));
    };
    const editItemList = (groupIndex, itemIndex, item) => {
        var list = [...groupData];
        console.log(list[groupIndex]["members"][itemIndex], item);
        list[groupIndex]["members"][itemIndex] = item;
        console.log(list[groupIndex]["members"][itemIndex], item);
        console.log(list);
        setGroupData(list);
        AsyncStorage.setItem("groupList", JSON.stringify(list));
    };

    const removeItemList = (groupIndex, itemIndex) => {
        //AsyncStorage.clear();

        let list = [...groupData];
        list[groupIndex]["members"].splice(itemIndex, 1);
        setGroupData(list);
        AsyncStorage.setItem("groupList", JSON.stringify(list));
    };

    const initData = async () => {
        try {
            const list = await AsyncStorage.getItem("groupList");
            if (list !== null) {
                setGroupData(JSON.parse(list));
            } else {
                setGroupData([{ group: "Basic", members: [] }]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        initData();
    }, []);

    const itemAddModal = () => {
        return (
            <View>
                <Modal
                    closeOnTouchOutside={true}
                    animationType="slide"
                    transparent={true}
                    visible={itemAddModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                            >
                                {" "}
                                아이템 추가하기{" "}
                            </Text>
                            <TextInput
                                placeholder="아이템 이름"
                                style={{
                                    padding: 10,
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                                onChangeText={(text) => {
                                    setAddItem(text);
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        if (addItem === "") {
                                            setItemAddModalVisible(
                                                !itemAddModalVisible
                                            );
                                        } else {
                                            addItemList(selectedIndex, addItem);
                                            setItemAddModalVisible(
                                                !itemAddModalVisible
                                            );
                                        }
                                    }}
                                >
                                    <Text style={styles.textStyle}>추가</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        setItemAddModalVisible(
                                            !itemAddModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const itemEditModal = () => {
        return (
            <View>
                <Modal
                    closeOnTouchOutside={true}
                    animationType="slide"
                    transparent={true}
                    visible={itemEditModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                            >
                                {" "}
                                아이템 수정하기{" "}
                            </Text>
                            <TextInput
                                placeholder="아이템 이름"
                                style={{
                                    padding: 10,
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                                onChangeText={(text) => {
                                    setAddItem(text);
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        editItemList(
                                            selectedIndex,
                                            selectedItemIndex,
                                            addItem
                                        );

                                        setItemEditModalVisible(
                                            !itemEditModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>수정</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        setItemEditModalVisible(
                                            !itemEditModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const itemDeleteModal = () => {
        return (
            <View>
                <Modal
                    closeOnTouchOutside={true}
                    animationType="slide"
                    transparent={true}
                    visible={itemDeleteModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                            >
                                {" "}
                                아이템 삭제하기{" "}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        removeItemList(
                                            selectedIndex,
                                            selectedItemIndex
                                        );
                                        setItemDeleteModalVisible(
                                            !itemDeleteModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>삭제</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        setItemDeleteModalVisible(
                                            !itemDeleteModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const groupAddModal = () => {
        return (
            <View>
                <Modal
                    closeOnTouchOutside={true}
                    animationType="slide"
                    transparent={true}
                    visible={groupAddModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                            >
                                {" "}
                                그룹 추가하기{" "}
                            </Text>
                            <TextInput
                                placeholder="그룹 이름"
                                style={{
                                    padding: 10,
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                                onChangeText={(text) => {
                                    setAddItem(text);
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        if (addItem === "") {
                                            setGroupAddModalVisible(
                                                !groupAddModalVisible
                                            );
                                        } else {
                                            const value = {
                                                group: addItem,
                                                members: [],
                                            };
                                            addGroupList(value);
                                            setAddItem("");
                                            setGroupAddModalVisible(
                                                !groupAddModalVisible
                                            );
                                        }
                                    }}
                                >
                                    <Text style={styles.textStyle}>추가</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        setGroupAddModalVisible(
                                            !groupAddModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };
    const groupDeleteModal = () => {
        return (
            <View>
                <Modal
                    closeOnTouchOutside={true}
                    animationType="slide"
                    transparent={true}
                    visible={groupDeleteModalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontFamily: "nanumpenB",
                                }}
                            >
                                {" "}
                                그룹 삭제하기{" "}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        removeGroupList(selectedIndex);
                                        setSelectedIndex(0);
                                        setGroupDeleteModalVisible(
                                            !groupDeleteModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>삭제</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#2196F3",
                                    }}
                                    onPress={() => {
                                        setGroupDeleteModalVisible(
                                            !groupDeleteModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };

    const listColor = (index) => {
        if (index % 2 === 1) {
            return {
                flex: 1,
                flexDirection: "row",
                backgroundColor: "antiquewhite",
            };
        } else {
            return {
                flex: 1,
                flexDirection: "row",
                backgroundColor: "beige",
            };
        }
    };

    if (dataLoaded) {
        return (
            <View style={styles.container}>
                {itemAddModal()}
                {itemEditModal()}
                {itemDeleteModal()}
                {groupAddModal()}
                {groupDeleteModal()}
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        borderWidth: 1,
                        paddingHorizontal: "5%",
                        justifyContent: "space-around",
                    }}
                >
                    <Text
                        style={{
                            flex: 1,
                            fontFamily: "nanumpenB",
                            fontSize: 18,
                            textAlignVertical: "center",
                            marginRight: "5%",
                        }}
                    >
                        그룹 선택
                    </Text>
                    <Picker
                        selectedValue={groupData[selectedIndex]["group"]}
                        style={{
                            flex: 3,
                            height: 100,
                            width: "50%",
                            alignSelf: "center",
                            fontFamily: "nanumpenB",
                            fontSize: 20,
                        }}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedIndex(itemIndex)
                        }
                    >
                        {groupData.map((item, index) => {
                            return (
                                <Picker.Item
                                    style={{
                                        fontFamily: "nanumpenB",
                                        fontSize: 20,
                                    }}
                                    label={item.group}
                                    value={item.group}
                                    key={index}
                                />
                            );
                        })}
                    </Picker>
                </View>
                <View style={styles.dataList}>
                    <View style={{ flex: 7 }}>
                        <FlatList
                            data={groupData[selectedIndex]["members"]}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={listColor(index)}>
                                        <Text
                                            style={{
                                                flex: 5,
                                                fontFamily: "nanumpenB",
                                                fontSize: 15,
                                            }}
                                        >
                                            {item}
                                        </Text>
                                        <View
                                            style={{
                                                flex: 4,
                                                flexDirection: "row",
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelectedItemIndex(index);
                                                    setItemEditModalVisible(
                                                        true
                                                    );
                                                }}
                                            >
                                                <Text style={styles.miniButton}>
                                                    수정
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelectedItemIndex(index);
                                                    setItemDeleteModalVisible(
                                                        true
                                                    );
                                                }}
                                            >
                                                <Text style={styles.miniButton}>
                                                    삭제
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignSelf: "center",
                            width: "50%",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                borderWidth: 1,
                                margin: "4%",
                            }}
                            onPress={() => {
                                setItemAddModalVisible(true);
                            }}
                        >
                            <Text
                                style={{
                                    paddingTop: "5%",
                                    textAlign: "center",
                                    width: "100%",
                                    fontFamily: "nanumpenB",
                                    fontSize: 18,
                                }}
                            >
                                아이템 추가
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.groupEdit}>
                    <TouchableOpacity
                        onPress={() => {
                            setGroupAddModalVisible(true);
                        }}
                        style={styles.button}
                    >
                        <Text style={{ fontFamily: "nanumpenB", fontSize: 20 }}>
                            그룹 추가하기
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setGroupDeleteModalVisible(true);
                        }}
                        style={styles.button}
                    >
                        <Text style={{ fontFamily: "nanumpenB", fontSize: 20 }}>
                            그룹 삭제하기
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawButton}>
                    <TouchableOpacity
                        onPress={() => {
                            setMembers([
                                ...groupData[selectedIndex]["members"],
                            ]);
                            shuffle(members);
                            props.navigation.navigate("NameDraw", {
                                _group: groupData[selectedIndex]["group"],
                                _members: groupData[selectedIndex]["members"],
                            });
                            // 저장 후 랜덤뽑기
                        }}
                        style={[styles.button, { width: "60%", height: "20%" }]}
                    >
                        <Text style={{ fontFamily: "nanumpenB", fontSize: 20 }}>
                            랜덤뽑기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <AppLoading
                startAsync={initData}
                onFinish={() => {
                    setDataLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    dataList: {
        flex: 8,
        marginHorizontal: "10%",
        paddingTop: "5%",
        paddingLeft: "5%",
        paddingRight: "2%",
        borderWidth: 1,
    },
    groupEdit: {
        flexDirection: "row",
        flex: 1,
        borderWidth: 1,
        justifyContent: "space-around",
        paddingHorizontal: "10%",
    },
    drawButton: {
        flex: 2,
        alignItems: "center",
    },
    button: {
        flex: 2,
        padding: "5%",
        margin: "2.2%",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    miniButton: {
        fontFamily: "nanumpenB",
        fontSize: 13,
        marginLeft: "20%",
        marginVertical: "7%",
        padding: "3%",
        borderWidth: 1,
        textAlign: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 15,
        padding: 10,
        marginHorizontal: 10,
        elevation: 2,
    },
});
