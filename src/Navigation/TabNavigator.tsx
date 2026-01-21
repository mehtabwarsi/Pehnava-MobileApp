import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './types';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import CartScreen from '../Screens/CartScreen/CartScreen';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import { theme } from '../theme/theme';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import CollectionScreen from '../Screens/Collection/CollectionScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
    const insets = useSafeAreaInsets();
    const cartCount = 3; // Mock cart count

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }} edges={["bottom"]}>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string = '';

                        if (route.name === 'HomeTab') {
                            iconName = 'home';
                        } else if (route.name === 'CollectionTab') {
                            iconName = 'grid';
                        } else if (route.name === 'CartTab') {
                            iconName = 'shopping-bag';
                        } else if (route.name === 'ProfileTab') {
                            iconName = 'user';
                        }

                        return (
                            <View style={[
                                styles.iconContainer,
                                focused && styles.activeIconContainer
                            ]}>
                                <View>
                                    <Icon name={iconName} size={focused ? 20 : 20} color={color} />
                                </View>
                            </View>
                        );
                    },
                    tabBarActiveTintColor: theme.colors.primary,
                    tabBarInactiveTintColor: theme.colors.slate,
                    tabBarShowLabel: true,
                    tabBarBadgeStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    tabBarLabelStyle: {
                        fontSize: 10,
                        marginTop: 4
                    },
                    tabBarStyle: [
                        styles.tabBar,
                        {
                            height: 40 + (insets.bottom > 0 ? insets.bottom : 10),
                            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
                        }
                    ],
                })}
            >
                <Tab.Screen
                    name="HomeTab"
                    component={HomeScreen}
                    options={{ title: 'Home' }}
                />
                <Tab.Screen
                    name="CollectionTab"
                    component={CollectionScreen}
                    options={{ title: 'Collection' }}
                />
                <Tab.Screen
                    name="CartTab"
                    component={CartScreen}
                    options={{
                        title: 'Bag',
                        tabBarBadge: cartCount,
                        tabBarStyle: { display: 'none' }
                    }}
                />
                <Tab.Screen
                    name="ProfileTab"
                    component={ProfileScreen}
                    options={{ title: 'Profile' }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: theme.colors.white,
        borderTopWidth: 0,
        elevation: 24,
        shadowColor: theme.colors.charcoal,
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: -8 },
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: 8,
        paddingHorizontal: 8,
    },
    iconContainer: {
        width: 42,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    activeIconContainer: {
        backgroundColor: theme.colors.primary + '15',
        transform: [{ scale: 1.05 }],
    },
});

export default TabNavigator;
