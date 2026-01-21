import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { ZoomIn, FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;

const SplashScreen = () => {
    const titleText = "Pehnava".split("");
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Main");
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }}>
            <View style={styles.container}>
                {/* Horizontal Layout: Logo + Text */}
                <View style={styles.brandContainer}>
                    {/* Logo Wrapper */}
                    <Animated.View
                        entering={ZoomIn.duration(1000).springify()}
                        style={styles.logoWrapper}
                    >
                        {/* Glow - blur effect simulation */}
                        <LinearGradient
                            colors={[theme.colors.primary, theme.colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.glow}
                        />

                        {/* Logo Box */}
                        <LinearGradient
                            colors={[theme.colors.primary, theme.colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.logoBox}
                        >
                            <Text style={styles.logoText}>P</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Text Column */}
                    <View style={styles.textColumn}>
                        <View style={styles.titleContainer}>
                            {titleText.map((letter, index) => (
                                <Animated.Text
                                    key={index}
                                    entering={FadeIn.delay(index * 150).duration(200)}
                                    style={styles.title}
                                >
                                    {letter}
                                </Animated.Text>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            <Animated.Text
                entering={FadeIn.delay(1200).duration(800)}
                style={styles.subtitle}
            >
                Traditional Wear
            </Animated.Text>
        </SafeAreaView >
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
        alignItems: "center",
        justifyContent: "center",
    },

    brandContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },

    logoWrapper: {
        position: "relative",
        width: 64,
        height: 64,

    },

    glow: {
        position: "absolute",
        width: 72,
        height: 72,
        left: -4,
        top: -4,
        borderRadius: 16,
        opacity: 0.1,
    },

    logoBox: {
        width: 64,
        height: 64,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        elevation: 8,
        shadowColor: theme.colors.accent,
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
    },

    logoText: {
        fontSize: 32,
        fontWeight: "800",
        color: theme.colors.white,
    },

    textColumn: {
        flexDirection: "column",
        justifyContent: "center",
    },

    titleContainer: {
        flexDirection: 'row',
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: theme.colors.charcoal,
        letterSpacing: -0.5,
    },

    subtitle: {
        fontSize: 15,
        color: theme.colors.slate,
        fontWeight: "bold",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: 50 // Added some bottom margin to lift it up from the very bottom edge if mostly centered, or just to keep it safe.
    },
});
