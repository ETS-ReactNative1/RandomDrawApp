import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Button,
    FlatList,
    TouchableOpacity,
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
                const _list = JSON.parse(list);
                if (_list.length === 0) {
                    setGroupData([{ group: "Basic", members: [] }]);
                } else {
                    setGroupData(_list);
                }
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
                                maxLength={20}
                                onChangeText={(text) => {
                                    setAddItem(text);
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ffa0aa",
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
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ddd8d8",
                                    }}
                                    onPress={() => {
                                        setItemAddModalVisible(
                                            !itemAddModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableOpacity>
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
                                maxLength={20}
                                onChangeText={(text) => {
                                    setAddItem(text);
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ffa07a",
                                    }}
                                    onPress={() => {
                                        if (addItem === "") {
                                            setItemEditModalVisible(
                                                !itemEditModalVisible
                                            );
                                        } else {
                                            editItemList(
                                                selectedIndex,
                                                selectedItemIndex,
                                                addItem
                                            );
                                            setItemEditModalVisible(
                                                !itemEditModalVisible
                                            );
                                        }
                                    }}
                                >
                                    <Text style={styles.textStyle}>수정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ddd8d8",
                                    }}
                                    onPress={() => {
                                        setItemEditModalVisible(
                                            !itemEditModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableOpacity>
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
                                아이템 삭제하기{" \n"}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ffa07a",
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
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ddd8d8",
                                    }}
                                    onPress={() => {
                                        setItemDeleteModalVisible(
                                            !itemDeleteModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableOpacity>
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
                                maxLength={20}
                                onChangeText={(text) => {
                                    setAddItem(text);
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ffa07a",
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
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ddd8d8",
                                    }}
                                    onPress={() => {
                                        setGroupAddModalVisible(
                                            !groupAddModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableOpacity>
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
                                그룹 삭제하기{" \n"}
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ffa07a",
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
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...styles.openButton,
                                        backgroundColor: "#ddd8d8",
                                    }}
                                    onPress={() => {
                                        setGroupDeleteModalVisible(
                                            !groupDeleteModalVisible
                                        );
                                    }}
                                >
                                    <Text style={styles.textStyle}>취소</Text>
                                </TouchableOpacity>
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
            };
        } else {
            return {
                flex: 1,
                flexDirection: "row",
                backgroundColor: "blanchedalmond",
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
                        flex: 1.2,
                        flexDirection: "row",
                        paddingHorizontal: "5%",
                        justifyContent: "space-around",
                    }}
                >
                    <Text
                        style={{
                            flex: 1.4,
                            fontFamily: "nanumpenB",
                            fontSize: 20,
                            textAlignVertical: "center",
                            marginRight: "5%",
                        }}
                    >
                        {"    "}
                        그룹 선택
                    </Text>
                    <Picker
                        selectedValue={groupData[selectedIndex]["group"]}
                        style={{
                            flex: 3,
                            height: 100,
                            width: "50%",
                            alignSelf: "center",
                        }}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedIndex(itemIndex)
                        }
                        textStyle={{
                            fontFamily: "nanumpenB",
                        }}
                        itemTextStyle={{
                            fontFamily: "nanumpenB",
                        }}
                    >
                        {groupData.map((item, index) => {
                            return (
                                <Picker.Item
                                    label={item.group}
                                    value={item.group}
                                    key={index}
                                />
                            );
                        })}
                    </Picker>
                </View>
                <View style={styles.dataList}>
                    <View style={{ flex: 8 }}>
                        <FlatList
                            data={groupData[selectedIndex]["members"]}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={listColor(index)}>
                                        <Text
                                            style={{
                                                flex: 5,
                                                fontFamily: "nanumpenR",
                                                fontSize: 22,
                                            }}
                                        >
                                            {"  "}
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
                            flex: 1.3,
                            justifyContent: "center",
                            alignSelf: "center",
                            width: "50%",
                            marginTop: "4%",
                        }}
                    >
                        <TouchableOpacity
                            style={[
                                styles.button,
                                {
                                    backgroundColor: "#fafaee",
                                },
                            ]}
                            onPress={() => {
                                setItemAddModalVisible(true);
                            }}
                        >
                            <Text
                                style={{
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
                        style={[styles.button, { backgroundColor: "#fafaed" }]}
                    >
                        <Text style={{ fontFamily: "nanumpenB", fontSize: 20 }}>
                            그룹 추가
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setGroupDeleteModalVisible(true);
                        }}
                        style={[styles.button, { backgroundColor: "#fafaed" }]}
                    >
                        <Text style={{ fontFamily: "nanumpenB", fontSize: 20 }}>
                            그룹 삭제
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.drawPlace}>
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
                        style={[
                            styles.button,
                            {
                                width: "41%",
                                backgroundColor: "#faf0e5",
                            },
                        ]}
                    >
                        <Text style={{ fontFamily: "nanumpenB", fontSize: 28 }}>
                            랜덤 뽑기!
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
    container: { flex: 1, backgroundColor: "#fffff8" },
    dataList: {
        flex: 6,
        marginHorizontal: "10%",
        marginBottom: "5%",
        paddingTop: "5%",
        paddingLeft: "5%",
        paddingRight: "2%",
        borderWidth: 1,
        borderRadius: 10,
    },
    groupEdit: {
        flexDirection: "row",
        flex: 1.2,
        justifyContent: "space-around",
        paddingHorizontal: "10%",
    },
    drawPlace: {
        flex: 1.8,
        alignItems: "center",
    },
    button: {
        flex: 1,
        padding: "5%",
        marginBottom: "7%",
        marginHorizontal: "4%",
        borderWidth: 1,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "darkgrey",
    },
    miniButton: {
        fontFamily: "nanumpenB",
        fontSize: 13,
        marginLeft: "20%",
        marginVertical: "7%",
        padding: "3%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 30,
        textAlign: "center",
        backgroundColor: "ghostwhite",
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
