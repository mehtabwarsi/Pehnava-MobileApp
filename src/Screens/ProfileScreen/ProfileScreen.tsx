import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    StatusBar
} from 'react-native';
import { theme } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock User Data
const MOCK_USER = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    membership: "Gold Member",
    joinDate: "Member since Oct 2023"
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
            <StatusBar barStyle="dark-content" />

            {/* Header / Title */}
            <View style={styles.appHeader}>
                <Text style={styles.headerTitle}>PROFILE</Text>
                <TouchableOpacity style={styles.settingsBtn}>
                    <Icon name="settings" size={20} color={theme.colors.charcoal} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Premium Profile Header */}
                <View style={styles.profileHeader}>
                    <View style={styles.profileMain}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: MOCK_USER.avatar }}
                                style={styles.avatarImage}
                            />
                            <TouchableOpacity style={styles.editAvatarBtn}>
                                <Icon name="camera" size={12} color={theme.colors.white} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{MOCK_USER.name}</Text>
                            <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
                            <View style={styles.membershipBadge}>
                                <Icon name="award" size={10} color={theme.colors.primary} />
                                <Text style={styles.membershipText}>{MOCK_USER.membership}</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.editProfileBtn}
                        onPress={handleEditProfile}
                    >
                        <Text style={styles.editProfileBtnText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* 2. Stats Dashboard */}
                <View style={styles.statsDashboard}>
                    <TouchableOpacity style={styles.statBox}>
                        <Text style={styles.statValue}>{totalOrders}</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </TouchableOpacity>
                    <View style={styles.statDivider} />
                    <TouchableOpacity style={styles.statBox}>
                        <Text style={styles.statValue}>{totalWishList}</Text>
                        <Text style={styles.statLabel}>Wishlist</Text>
                    </TouchableOpacity>
                    <View style={styles.statDivider} />
                    <TouchableOpacity style={styles.statBox}>
                        <Text style={styles.statValue}>₹450</Text>
                        <Text style={styles.statLabel}>Credits</Text>
                    </TouchableOpacity>
                </View>

                {/* 3. Menu Categories */}
                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>MY ACTIVITY</Text>
                    <View style={styles.menuGroup}>
                        <MenuRow
                            icon="package"
                            title="My Orders"
                            subtitle="Track, cancel or buy again"
                        />
                        <MenuRow
                            icon="heart"
                            title="Wishlist"
                            subtitle="Your most loved treasures"
                            isLast
                        />
                    </View>

                    <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
                    <View style={styles.menuGroup}>
                        <MenuRow
                            icon="map-pin"
                            title="Addresses"
                            subtitle="Manage delivery locations"
                        />
                        <MenuRow
                            icon="credit-card"
                            title="Payment Methods"
                            subtitle="Saved cards and UPI IDs"
                        />
                        <MenuRow
                            icon="bell"
                            title="Notifications"
                            subtitle="Offers and order updates"
                            isLast
                        />
                    </View>

                    <Text style={styles.sectionTitle}>SUPPORT & INFORMATION</Text>
                    <View style={styles.menuGroup}>
                        <MenuRow
                            icon="help-circle"
                            title="Help Center"
                            subtitle="FAQs and customer support"
                        />
                        <MenuRow
                            icon="info"
                            title="About Us"
                            subtitle="Our story and boutiques"
                        />
                        <MenuRow
                            icon="file-text"
                            title="Terms & Privacy"
                            subtitle="Legal information"
                            isLast
                        />
                    </View>
                </View>

                {/* 4. Branding & Logout */}
                <View style={styles.footerSection}>
                    <TouchableOpacity
                        style={styles.logoutBtn}
                        onPress={handleLogout}
                    >
                        <Icon name="log-out" size={18} color="#FF3E6C" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>

                    <Text style={styles.versionText}>Pehnava Boutique v1.0.4</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const MenuRow = ({ icon, title, subtitle, isLast, onPress }: any) => (
    <TouchableOpacity
        style={[styles.menuRow, !isLast && styles.rowBorder]}
        onPress={onPress}
        activeOpacity={0.7}
    >
        <View style={styles.rowLead}>
            <View style={styles.iconCircle}>
                <Icon name={icon} size={18} color={theme.colors.charcoal} />
            </View>
            <View style={styles.rowInfo}>
                <Text style={styles.rowTitle}>{title}</Text>
                <Text style={styles.rowSubtitle}>{subtitle}</Text>
            </View>
        </View>
        <Icon name="chevron-right" size={18} color={theme.colors.slate} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    appHeader: {
        height: 60,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '800',
        color: theme.colors.charcoal,
        letterSpacing: 2,
    },
    settingsBtn: {
        position: 'absolute',
        right: 16,
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeader: {
        backgroundColor: theme.colors.white,
        padding: 24,
        alignItems: 'center',
    },
    profileMain: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F3F4F6',
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: theme.colors.charcoal,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: theme.colors.white,
    },
    profileInfo: {
        marginLeft: 20,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    userEmail: {
        fontSize: 13,
        color: theme.colors.slate,
        marginTop: 2,
    },
    membershipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary + '10',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginTop: 8,
        gap: 4,
    },
    membershipText: {
        fontSize: 10,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    editProfileBtn: {
        width: '100%',
        height: 44,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editProfileBtnText: {
        fontSize: 13,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    statsDashboard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        marginVertical: 12,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '800',
        color: theme.colors.charcoal,
    },
    statLabel: {
        fontSize: 11,
        color: theme.colors.slate,
        fontWeight: '500',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: '60%',
        backgroundColor: '#EEEEEE',
        alignSelf: 'center',
    },
    menuSection: {
        paddingVertical: 12,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: theme.colors.slate,
        letterSpacing: 1.5,
        paddingHorizontal: 20,
        marginBottom: 12,
        marginTop: 12,
    },
    menuGroup: {
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
    },
    menuRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    rowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    rowLead: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rowInfo: {
        flex: 1,
    },
    rowTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    rowSubtitle: {
        fontSize: 11,
        color: theme.colors.slate,
        marginTop: 2,
    },
    footerSection: {
        marginTop: 24,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoutBtn: {
        width: '100%',
        height: 52,
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FF3E6C30',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 20,
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '800',
        color: '#FF3E6C',
    },
    versionText: {
        fontSize: 11,
        color: '#BBBBBB',
        fontWeight: '500',
    }
});

export default ProfileScreen;
