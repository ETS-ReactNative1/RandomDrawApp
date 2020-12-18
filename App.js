import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from "expo-ads-admob";
import Screen from "./app/screens/screenController";

export default function App() {
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

    return (
        <View style={styles.container}>
            <Screen />
            {banner()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center",
    },
});
