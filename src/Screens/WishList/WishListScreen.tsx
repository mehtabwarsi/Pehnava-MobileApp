import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import { theme } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/Product/ProductCard';

const { width } = Dimensions.get('window');

// Mock Data for Wishlist
const WISHLIST_ITEMS = [
    {
        id: "1",
        slug: "premium-silk-saree",
        title: "Banarasi Silk Saree",
        price: 4500,
        originalPrice: 8999,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        isNew: true,
        rating: 4.8,
    },
    {
        id: "4",
        slug: "modern-lehenga-choli",
        title: "Bridal Lehenga",
        price: 12500,
        originalPrice: 25000,
        image: "https://i.pinimg.com/1200x/f3/f9/f5/f3f9f5b48079d4daa97e07a9a97395a6.jpg",
        isNew: false,
        rating: 4.9,
    },
    {
        id: "2",
        slug: "designer-kurta-set",
        title: "Designer Kurta Set",
        price: 2499,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
        isNew: false,
        rating: 4.5,
    },
];

const WishListScreen = () => {
    const navigation = useNavigation();
    const [wishlist, setWishlist] = useState(WISHLIST_ITEMS);

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>My Wishlist</Text>
                <Text style={styles.itemCount}>{wishlist.length} Items</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
                <Icon name="bag-outline" size={24} color={theme.colors.charcoal} />
            </TouchableOpacity>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <View style={styles.iconCircle}>
                <Icon name="heart-outline" size={48} color={theme.colors.slate} />
            </View>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>
                Explore our collection and save your favorite styles here.
            </Text>
            <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Home' as never)}
            >
                <Text style={styles.exploreText}>START SHOPPING</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}

            <FlatList
                data={wishlist}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={[
                    styles.listContent,
                    wishlist.length === 0 && styles.emptyListContent
                ]}
                renderItem={({ item }) => (
                    <View style={styles.gridItem}>
                        <ProductCard {...item} />
                    </View>
                )}
                ListEmptyComponent={renderEmptyState}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightGray,
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.charcoal,
        marginBottom: 2,
    },
    itemCount: {
        fontSize: 12,
        color: theme.colors.slate,
        fontWeight: '500',
    },
    iconButton: {
        padding: 8,
        backgroundColor: theme.colors.lightGray,
        borderRadius: 20,
    },
    listContent: {
        padding: 16,
        paddingBottom: 24,
    },
    emptyListContent: {
        flex: 1,
    },
    row: {
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 16,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        paddingHorizontal: 32,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.lightGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.charcoal,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: theme.colors.slate,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    exploreButton: {
        backgroundColor: theme.colors.charcoal,
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    exploreText: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
});

export default WishListScreen;