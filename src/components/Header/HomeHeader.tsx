import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Dimensions,
    Platform
} from 'react-native';
import { theme } from '../../theme/theme';
import Logo from '../Logo';
import Icon from 'react-native-vector-icons/Ionicons';
import { requestLocationPermission } from '../../utils/Location/location';
import { getCurrentLocation } from '../../utils/Location/getCoordinates';
import { getAddressFromCoords } from '../../utils/Location/geoName';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomeHeaderProps {
    activeTab: 'Men' | 'Women' | 'All';
    onTabChange: (tab: 'Men' | 'Women' | 'All') => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ activeTab, onTabChange }) => {
    const [location, setLocation] = useState("Fetching location...");
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const fetchLocation = async () => {
        try {
            setLocation("Fetching...");
            const granted = await requestLocationPermission();
            if (!granted) {
                setLocation("Set Location");
                return;
            }

            const { latitude, longitude } = await getCurrentLocation();
            const place = await getAddressFromCoords(latitude, longitude);

            setLocation(place);
        } catch (error) {
            console.error("Location error:", error);
            setLocation("Select Location");
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return (
        <View style={styles.outerContainer}>
            {/* Top Row: Logo & Basic Actions */}
            <View style={styles.topRow}>
                <View style={styles.logoWrapper}>
                    <Logo />
                </View>

                <View style={styles.topActions}>
                    <TouchableOpacity
                        style={styles.locationContainer}
                        onPress={fetchLocation}
                        activeOpacity={0.7}
                    >
                        <View style={styles.locationIconCircle}>
                            <Icon name="location" size={12} color={theme.colors.primary} />
                        </View>
                        <View style={styles.locationTextWrapper}>
                            <Text style={styles.locationLabel}>DELIVER TO</Text>
                            <Text style={styles.locationValue} numberOfLines={1}>{location}</Text>
                        </View>
                        <Icon name="chevron-down" size={14} color={theme.colors.slate} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionIconBtn}
                        onPress={() => navigation.navigate("WishList")}
                    >
                        <Icon name="heart-outline" size={24} color={theme.colors.charcoal} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Search Bar Row */}
            <TouchableOpacity
                style={styles.searchWrapper}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("Search")}
            >
                <View style={styles.searchBar}>
                    <Icon name="search-outline" size={20} color={theme.colors.slate} style={styles.searchIcon} />
                    <Text style={styles.searchPlaceholder}>Search for Banarasi, Kurtas...</Text>
                    <View style={styles.searchDivider} />
                    <Icon name="mic-outline" size={20} color={theme.colors.primary} />
                </View>
            </TouchableOpacity>

            {/* Premium Category Tabs */}
            <View style={styles.tabBar}>
                {['All', 'Men', 'Women'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => onTabChange(tab as any)}
                        style={[
                            styles.tab,
                            activeTab === tab && styles.activeTab
                        ]}
                    >
                        <Text style={[
                            styles.tabText,
                            activeTab === tab && styles.activeTabText
                        ]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: theme.colors.white,
        paddingTop: Platform.OS === 'ios' ? 0 : 8,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    logoWrapper: {
        width: 100,
    },
    topActions: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        gap: 12,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        maxWidth: SCREEN_WIDTH * 0.45,
    },
    locationIconCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    locationTextWrapper: {
        flex: 1,
        marginRight: 4,
    },
    locationLabel: {
        fontSize: 8,
        fontWeight: '800',
        color: theme.colors.slate,
        letterSpacing: 0.5,
    },
    locationValue: {
        fontSize: 11,
        fontWeight: '700',
        color: theme.colors.charcoal,
    },
    actionIconBtn: {
        padding: 4,
    },
    searchWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    searchBar: {
        height: 48,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    searchIcon: {
        marginRight: 12,
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 14,
        color: theme.colors.slate,
        fontWeight: '500',
    },
    searchDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#DDDDDD',
        marginHorizontal: 12,
    },
    tabBar: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginTop: 4,
        gap: 24,
    },
    tab: {
        paddingVertical: 12,
        position: 'relative',
    },
    activeTab: {
        // Active container styles
    },
    tabText: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.slate,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    activeTabText: {
        color: theme.colors.charcoal,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: theme.colors.primary,
        borderRadius: 2,
    }
});

export default HomeHeader;
