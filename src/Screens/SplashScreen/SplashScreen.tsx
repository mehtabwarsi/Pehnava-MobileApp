import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../theme/theme";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    Easing,
    FadeIn,
    FadeInDown
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation/types";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Splash">;

const SplashScreen = () => {
    const navigation = useNavigation<NavigationProp>();

    // Shared values for complex animations
    const logoScale = useSharedValue(0.8);
    const logoOpacity = useSharedValue(0);
    const pulsing = useSharedValue(1);

    useEffect(() => {
        // Initial entry animation
        logoScale.value = withTiming(1, {
            duration: 1200,
            easing: Easing.out(Easing.back(1.5))
        });
        logoOpacity.value = withTiming(1, { duration: 1000 });

        // Subtle pulsing effect
        pulsing.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
                withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) })
            ),
            -1,
            true
        );

        const timer = setTimeout(() => {
            navigation.replace("Main");
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    const animatedLogoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value * pulsing.value }],
        opacity: logoOpacity.value,
    }));

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

            {/* White Professional Background */}
            <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.colors.white }]} />

            <View style={styles.overlayContainer}>
                <View style={styles.brandWrapper}>
                    {/* Pulsing Glow (Subtle for white background) */}
                    <Animated.View style={[styles.glow, { opacity: logoOpacity.value * 0.1 }]} />

                    {/* Logo Box */}
                    <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                        <LinearGradient
                            colors={[theme.colors.primary, theme.colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.logoBox}
                        >
                            <Text style={styles.logoLetter}>P</Text>
                        </LinearGradient>
                    </Animated.View>

                    {/* Brand Name */}
                    <Animated.View entering={FadeInDown.delay(600).duration(800)}>
                        <Text style={styles.brandTitle}>PEHNAVA</Text>
                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.tagline}>BOUTIQUE</Text>
                            <View style={styles.divider} />
                        </View>
                    </Animated.View>
                </View>

                {/* Bottom Credits */}
                <Animated.View
                    entering={FadeIn.delay(1200).duration(1000)}
                    style={styles.footer}
                >
                    <Text style={styles.footerText}>EST. 2024</Text>
                    <Text style={styles.footerSubText}>CRAFTED WITH HERITAGE</Text>
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    brandWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    glow: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: theme.colors.primary,
        // Using shadow as a blur alternative
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 50,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logoBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#' + (theme.colors.primary.replace('#', '')),
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
    },
    logoLetter: {
        fontSize: 42,
        fontWeight: '900',
        color: theme.colors.white,
    },
    brandTitle: {
        fontSize: 36,
        fontWeight: '800',
        color: theme.colors.charcoal,
        letterSpacing: 8,
        textAlign: 'center',
        marginLeft: 8,
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        gap: 12,
    },
    divider: {
        width: 40,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    tagline: {
        fontSize: 12,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.4)',
        letterSpacing: 4,
        textTransform: 'uppercase',
    },
    footer: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 10,
        fontWeight: '900',
        color: 'rgba(0,0,0,0.2)',
        letterSpacing: 2,
        marginBottom: 4,
    },
    footerSubText: {
        fontSize: 9,
        fontWeight: '700',
        color: 'rgba(0,0,0,0.15)',
        letterSpacing: 1,
    }
});

export default SplashScreen;
