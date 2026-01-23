import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title?: string;
    showBack?: boolean;
    onPressBack?: () => void;
    showShare?: boolean;
    onPressShare?: () => void;
    showWishlist?: boolean;
    onPressWishlist?: () => void;
    showCart?: boolean;
    onPressCart?: () => void;
    cartItemCount?: number;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
}

const Header = ({
    title,
    showBack = true,
    onPressBack,
    showShare = false,
    onPressShare,
    showWishlist = false,
    onPressWishlist,
    showCart = false,
    onPressCart,
    cartItemCount = 0,
    containerStyle,
    titleStyle
}: HeaderProps) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (onPressBack) {
            onPressBack();
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                )}
                {title && <Text style={[styles.title, titleStyle]} numberOfLines={1}>{title}</Text>}
            </View>

            <View style={styles.rightContainer}>
                {showShare && (
                    <TouchableOpacity onPress={onPressShare} style={styles.iconButton}>
                        <Icon name="share-social-outline" size={24} color="#333" />
                    </TouchableOpacity>
                )}
                {showWishlist && (
                    <TouchableOpacity onPress={onPressWishlist} style={styles.iconButton}>
                        <Icon name="heart-outline" size={24} color="#333" />
                    </TouchableOpacity>
                )}
                {showCart && (
                    <TouchableOpacity onPress={onPressCart} style={styles.iconButton}>
                        <View>
                            <Icon name="bag-outline" size={24} color="#333" />
                            {cartItemCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {cartItemCount > 9 ? '9+' : cartItemCount}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginLeft: 12,
        flex: 1,
    },
    iconButton: {
        padding: 4,
    },
    badge: {
        position: 'absolute',
        top: -6,
        right: -8,
        backgroundColor: '#FF3F6C',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})