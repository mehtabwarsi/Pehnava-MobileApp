import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import { theme } from '../../theme/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/Product/ProductCard';

// Mock Data
const RECENT_SEARCHES = [
    'Silk Saree', 'Kurta Set', 'Lehenga', 'Sherwani', 'Earrings'
];

const MOCK_ALL_PRODUCTS = [
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
        id: "2",
        slug: "designer-kurta-set",
        title: "Designer Kurta Set",
        price: 2499,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
        isNew: false,
        rating: 4.5,
    },
    {
        id: "3",
        slug: "ethnic-party-wear",
        title: "Ethnic Party Wear",
        price: 3200,
        originalPrice: 4500,
        image: "https://i.pinimg.com/736x/b9/2f/f5/b92ff5d2013e43589349109e09f7955f.jpg",
        isNew: true,
        rating: 4.2,
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
];

const SearchScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(MOCK_ALL_PRODUCTS);

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        if (text) {
            const filtered = MOCK_ALL_PRODUCTS.filter(product =>
                product.title.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(MOCK_ALL_PRODUCTS);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredProducts(MOCK_ALL_PRODUCTS);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color={theme.colors.charcoal} />
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color={theme.colors.slate} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for products, brands and more"
                    placeholderTextColor={theme.colors.slate}
                    value={searchQuery}
                    onChangeText={handleSearch}
                    autoFocus={true}
                />
                {searchQuery.length > 0 ? (
                    <TouchableOpacity onPress={clearSearch}>
                        <Icon name="close-circle" size={18} color={theme.colors.slate} />
                    </TouchableOpacity>
                ) : (
                    <>
                        <View style={styles.searchDivider} />
                        <TouchableOpacity>
                            <Icon name="mic-outline" size={20} color={theme.colors.primary} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );

    const renderRecentSearches = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
                {RECENT_SEARCHES.map((term, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.chip}
                        onPress={() => handleSearch(term)}
                    >
                        <Text style={styles.chipText}>{term}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderContent = () => {
        if (searchQuery.length === 0) {
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {renderRecentSearches()}

                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Trending Now</Text>
                            <Icon name="trending-up" size={18} color={theme.colors.primary} />
                        </View>
                        <View style={styles.gridContainer}>
                            {MOCK_ALL_PRODUCTS.slice(0, 4).map((item) => (
                                <View key={item.id} style={styles.gridItem}>
                                    <ProductCard {...item} />
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            );
        }

        return (
            <View style={styles.resultsContainer}>
                <Text style={styles.resultsCount}>
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
                </Text>

                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <View style={styles.gridItem}>
                            <ProductCard {...item} />
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Icon name="search" size={48} color={theme.colors.borderDark} />
                            <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
                            <Text style={styles.emptySubtext}>Try checking your spelling or use different keywords</Text>
                        </View>
                    }
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderContent()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Matches Home background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightGray,
    },
    backButton: {
        marginRight: 12,
        padding: 4,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.lightGray,
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#DDDDDD',
        marginHorizontal: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: theme.colors.charcoal,
        fontWeight: '500',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: theme.colors.charcoal,
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    chipsContainer: {
        flexDirection: 'row',
        gap: 10,
        paddingRight: 16,
    },
    chip: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    chipText: {
        fontSize: 13,
        color: theme.colors.charcoal,
        fontWeight: '500',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridItem: {
        width: '48%',
        marginBottom: 16,
    },
    resultsContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    resultsCount: {
        fontSize: 13,
        color: theme.colors.slate,
        marginVertical: 16,
        fontWeight: '500',
    },
    row: {
        justifyContent: 'space-between',
    },
    listContent: {
        paddingBottom: 20,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.charcoal,
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: theme.colors.slate,
        textAlign: 'center',
    },
});

export default SearchScreen;
