import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import { theme } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";

// Mock User Data
const MOCK_USER = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: null, // Placeholder logic
};

const ProfileScreen = () => {
    const totalWishList = 8;
    const totalOrders = 12;

    const handleLogout = () => {
        console.log("Logging out...");
    };

    const handleEditProfile = () => {
        console.log("Editing profile...");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarCircle}>
                            <Icon name="user" size={48} color={theme.colors.slate + "50"} />
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            activeOpacity={0.8}
                        >
                            <Icon name="camera" size={14} color={theme.colors.white} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{MOCK_USER.name}</Text>
                        <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={handleEditProfile}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* 2. Stats Row */}
                <View style={styles.statsRow}>
                    <View style={[styles.statItem, styles.statDivider]}>
                        <Text style={styles.statValue}>{totalOrders}</Text>
                        <Text style={styles.statLabel}>ORDERS</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{totalWishList}</Text>
                        <Text style={styles.statLabel}>WISHLIST</Text>
                    </View>
                </View>

                {/* 3. Menu List */}
                <View style={styles.menuContainer}>
                    <MenuItem
                        icon="package"
                        title="My Orders"
                        desc="Track active orders and returns"
                    />
                    <MenuItem
                        icon="heart"
                        title="Wishlist"
                        desc="Your curated collection"
                    />
                    <MenuItem
                        icon="map-pin"
                        title="Addresses"
                        desc="Manage delivery locations"
                    />
                    <MenuItem
                        icon="credit-card"
                        title="Payment Methods"
                        desc="Manage cards and UPI"
                    />
                    <MenuItem
                        icon="shield"
                        title="Privacy & Security"
                        desc="Password and account access"
                    />
                    <MenuItem
                        icon="help-circle"
                        title="Help Center"
                        desc="FAQs and customer support"
                    />
                </View>

                {/* 4. Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    activeOpacity={0.8}
                >
                    <Icon name="log-out" size={18} color="#FF3B30" />
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

// Reusable Menu Item Component
const MenuItem = ({ icon, title, desc, onPress }: any) => (
    <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
        activeOpacity={0.6}
    >
        <View style={styles.menuIconCircle}>
            <Icon name={icon} size={20} color={theme.colors.charcoal} />
        </View>
        <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>{title}</Text>
            <Text style={styles.menuDesc} numberOfLines={1}>
                {desc}
            </Text>
        </View>
        <Icon name="chevron-right" size={20} color={theme.colors.border} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.offWhite,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: "center",
        marginBottom: 32,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 4,
        borderColor: theme.colors.white,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
    },
    addButton: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.charcoal,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: theme.colors.white,
    },
    userInfo: {
        alignItems: "center",
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
        color: theme.colors.charcoal,
    },
    userEmail: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.slate,
        marginTop: 4,
    },
    editButton: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.charcoal,
    },
    statsRow: {
        flexDirection: "row",
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        paddingVertical: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: theme.colors.border + "40",
    },
    statItem: {
        flex: 1,
        alignItems: "center",
    },
    statDivider: {
        borderRightWidth: 1,
        borderRightColor: theme.colors.border + "40",
    },
    statValue: {
        fontSize: 22,
        fontWeight: "bold",
        color: theme.colors.charcoal,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: "600",
        color: theme.colors.slate,
        marginTop: 4,
        letterSpacing: 1,
    },
    menuContainer: {
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        paddingVertical: 8,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: theme.colors.border + "40",
        overflow: "hidden",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.offWhite,
    },
    menuIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.lightGray + "50",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 16,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: theme.colors.charcoal,
    },
    menuDesc: {
        fontSize: 12,
        color: theme.colors.slate,
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "#FF3B3020",
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FF3B30",
    },
});

export default ProfileScreen;
