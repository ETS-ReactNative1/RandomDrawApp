import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from "expo-ads-admob";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import ScreenController from "./app/routes/screenController";

const getFont = () => {
    return Font.loadAsync({
        nanumpenB: require("./app/assets/fonts/NanumBarunpenB.ttf"),
        nanumpenR: require("./app/assets/fonts/NanumBarunpenR.ttf"),
    });
};

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    const interstitial = async () => {
        await AdMobInterstitial.setAdUnitID(
            "ca-app-pub-8596476786252416/4478788560"
        );
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
    };

    const banner = () => {
        return (
            <AdMobBanner
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={this.bannerError}
            />
        );
    };

    /*useEffect(() => {
        interstitial();
    }, [fontLoaded]);*/

    if (fontLoaded) {
        return (
            <View style={styles.container}>
                <ScreenController />
                <View style={{ alignItems: "flex-end" }}>{banner()}</View>
            </View>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFont}
                onFinish={() => {
                    setFontLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "flex-end",
    },
});
