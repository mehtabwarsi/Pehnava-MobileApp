import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../theme/theme";

const Logo = () => {
    return (
        <View
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
        </View>
    );
};

export default Logo;

const styles = StyleSheet.create({
    logoWrapper: {
        position: "relative",
        width: 50,
        height: 50,
    },

    glow: {
        position: "absolute",
        width: 55,
        height: 55,
        left: -2,
        top: -2,
        borderRadius: 16,
        opacity: 0.1,
    },

    logoBox: {
        width: 50,
        height: 50,
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
        fontSize: 25,
        fontWeight: "800",
        color: theme.colors.white,
    },
});