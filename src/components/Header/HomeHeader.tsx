import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "../../theme/theme";
import Logo from "../Logo";
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { requestLocationPermission } from "../../utils/Location/location";
import { getCurrentLocation } from "../../utils/Location/getCoordinates";
import { getAddressFromCoords } from "../../utils/Location/geoName";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HomeHeaderProps {
    activeTab: 'Men' | 'Women' | 'All';
    onTabChange: (tab: 'Men' | 'Women' | 'All') => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ activeTab, onTabChange }) => {
    const [location, setLocation] = useState("Fetching...");
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const fetchLocation = async () => {
        try {
            setLocation("Fetching...");
            const granted = await requestLocationPermission();
            if (!granted) {
                setLocation("Location denied");
                return;
            }

            const { latitude, longitude } = await getCurrentLocation();
            const place = await getAddressFromCoords(latitude, longitude);

            setLocation(place);
        } catch (error) {
            console.error("Location error:", error);
            setLocation("Location unavailable");
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    const handleSearchPress = () => {
        navigation.navigate("Search");
    };

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Logo />
                </View>

                {/* Location */}
                <TouchableOpacity
                    style={styles.locationContainer}
                    onPress={fetchLocation}
                    activeOpacity={0.7}
                >
                    <Icon name="location-outline" size={16} color={theme.colors.charcoal} />
                    <Text style={styles.locationText} numberOfLines={1}>{location}</Text>
                    <Icon name="chevron-down" size={16} color={theme.colors.charcoal} />
                </TouchableOpacity>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    {/* Search Icon */}
                    <TouchableOpacity style={styles.iconButton} onPress={handleSearchPress}>
                        <Icon name="search-outline" size={24} color={theme.colors.charcoal} />
                    </TouchableOpacity>

                    {/* Wishlist Icon */}
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate("WishList")}>
                        <Icon name="heart-outline" size={24} color={theme.colors.charcoal} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Category Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    onPress={() => onTabChange('All')}
                    style={[styles.tab, activeTab === 'All' && styles.activeTab]}
                >
                    <Text style={[styles.tabText, activeTab === 'All' && styles.activeTabText]}>All</Text>
                    {activeTab === 'All' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onTabChange('Men')}
                    style={[styles.tab, activeTab === 'Men' && styles.activeTab]}
                >
                    <Text style={[styles.tabText, activeTab === 'Men' && styles.activeTabText]}>Men</Text>
                    {activeTab === 'Men' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onTabChange('Women')}
                    style={[styles.tab, activeTab === 'Women' && styles.activeTab]}
                >
                    <Text style={[styles.tabText, activeTab === 'Women' && styles.activeTabText]}>Women</Text>
                    {activeTab === 'Women' && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: theme.colors.offWhite,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
    },
    logoContainer: {
        marginRight: 12,
    },
    locationContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    locationText: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.charcoal,
    },
    actionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconButton: {
        padding: 8,
        marginLeft: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingTop: 4,
        paddingBottom: 8,
        gap: 24,
    },
    tab: {
        paddingVertical: 4,
        position: 'relative',
    },
    activeTab: {
        // No specific container style for active
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.slate,
    },
    activeTabText: {
        color: theme.colors.primary,
    },
    tabUnderline: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
    }
});

