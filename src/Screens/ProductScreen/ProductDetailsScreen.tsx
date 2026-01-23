import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MOCK_PRODUCT_DETAILS = {
    id: "1",
    title: "Premium Banarasi Silk Saree",
    price: 4500,
    originalPrice: 8999,
    rating: 4.8,
    reviewCount: 124,
    description: "Experience the luxury of authentic Banarasi silk. This handwoven masterpiece features intricate zari work and traditional motifs, perfect for weddings and special occasions. The rich texture and vibrant colors make it a timeless addition to your wardrobe.",
    images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b", // Placeholder for variety
        "https://images.unsplash.com/photo-1599032909756-5dee8c652ad7"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#C2185B", "#1976D2", "#388E3C"], // Hex codes for colors
};

const ProductDetailsScreen = () => {
    const navigation = useNavigation();
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(MOCK_PRODUCT_DETAILS.colors[0]);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const discountPercentage = Math.round(
        ((MOCK_PRODUCT_DETAILS.originalPrice - MOCK_PRODUCT_DETAILS.price) /
            MOCK_PRODUCT_DETAILS.originalPrice) * 100
    );

    const handleScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);
        setActiveImageIndex(roundIndex);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-back" size={24} color={theme.colors.charcoal} />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.headerBtn}>
                        <Icon name="share-social-outline" size={22} color={theme.colors.charcoal} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerBtn}>
                        <Icon name="bag-outline" size={22} color={theme.colors.charcoal} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Image Carousel */}
                <View style={styles.carouselContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                    >
                        {MOCK_PRODUCT_DETAILS.images.map((img, index) => (
                            <Image
                                key={index}
                                source={{ uri: img }}
                                style={styles.carouselImage}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                    {/* Pagination Dots */}
                    <View style={styles.pagination}>
                        {MOCK_PRODUCT_DETAILS.images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    activeImageIndex === index && styles.paginationDotActive
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    {/* Title & Rating */}
                    <View style={styles.titleRow}>
                        <Text style={styles.productTitle}>{MOCK_PRODUCT_DETAILS.title}</Text>
                        <View style={styles.ratingBadge}>
                            <Text style={styles.ratingText}>{MOCK_PRODUCT_DETAILS.rating}</Text>
                            <Icon name="star" size={10} color={theme.colors.white} />
                        </View>
                    </View>

                    {/* Price */}
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{MOCK_PRODUCT_DETAILS.price.toLocaleString('en-IN')}</Text>
                        <Text style={styles.originalPrice}>
                            ₹{MOCK_PRODUCT_DETAILS.originalPrice.toLocaleString('en-IN')}
                        </Text>
                        <Text style={styles.discountText}>{discountPercentage}% OFF</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Sizes */}
                    <Text style={styles.sectionTitle}>Select Size</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorScroll}>
                        {MOCK_PRODUCT_DETAILS.sizes.map((size) => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.sizeChip,
                                    selectedSize === size && styles.sizeChipSelected
                                ]}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text style={[
                                    styles.sizeText,
                                    selectedSize === size && styles.sizeTextSelected
                                ]}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Colors */}
                    <Text style={styles.sectionTitle}>Select Color</Text>
                    <View style={styles.colorRow}>
                        {MOCK_PRODUCT_DETAILS.colors.map((color) => (
                            <TouchableOpacity
                                key={color}
                                onPress={() => setSelectedColor(color)}
                                style={[
                                    styles.colorOuter,
                                    selectedColor === color && styles.colorOuterSelected
                                ]}
                            >
                                <View style={[styles.colorInner, { backgroundColor: color }]} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Description */}
                    <Text style={styles.sectionTitle}>Product Description</Text>
                    <Text style={styles.descriptionText}>
                        {MOCK_PRODUCT_DETAILS.description}
                    </Text>
                </View>

                {/* Bottom Spacer */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.wishlistBtn}>
                    <Icon name="heart-outline" size={24} color={theme.colors.charcoal} />
                    <Text style={styles.wishlistText}>WISHLIST</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToBagBtn}>
                    <Icon name="bag-handle" size={20} color={theme.colors.white} />
                    <Text style={styles.addToBagText}>ADD TO BAG</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    headerRight: {
        flexDirection: 'row',
        gap: 16,
    },
    headerBtn: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    carouselContainer: {
        position: 'relative',
        height: 450,
        backgroundColor: theme.colors.lightGray,
    },
    carouselImage: {
        width: width,
        height: 450,
    },
    pagination: {
        position: 'absolute',
        bottom: 16,
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 8,
    },
    paginationDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    paginationDotActive: {
        backgroundColor: theme.colors.white,
        width: 18,
    },
    detailsContainer: {
        padding: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
        marginBottom: 8,
    },
    productTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.charcoal,
        lineHeight: 28,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    ratingText: {
        color: theme.colors.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 20,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.charcoal,
    },
    originalPrice: {
        fontSize: 16,
        color: theme.colors.slate,
        textDecorationLine: 'line-through',
    },
    discountText: {
        fontSize: 16,
        color: theme.colors.accent,
        fontWeight: '700',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.charcoal,
        marginBottom: 12,
    },
    selectorScroll: {
        marginBottom: 8,
        flexGrow: 0,
    },
    sizeChip: {
        borderWidth: 1,
        borderColor: theme.colors.borderDark,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        minWidth: 50,
        alignItems: 'center',
    },
    sizeChipSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + '10', // 10% opacity
    },
    sizeText: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.charcoal,
    },
    sizeTextSelected: {
        color: theme.colors.primary,
    },
    colorRow: {
        flexDirection: 'row',
        gap: 16,
    },
    colorOuter: {
        padding: 2,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    colorOuterSelected: {
        borderColor: theme.colors.charcoal,
    },
    colorInner: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    descriptionText: {
        fontSize: 15,
        color: theme.colors.slate,
        lineHeight: 24,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    wishlistBtn: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.borderDark,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 50,
    },
    wishlistText: {
        fontSize: 13,
        fontWeight: '800',
        color: theme.colors.charcoal,
        letterSpacing: 0.5,
    },
    addToBagBtn: {
        flex: 1.5,
        backgroundColor: theme.colors.charcoal,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: 50,
    },
    addToBagText: {
        fontSize: 13,
        fontWeight: '800',
        color: theme.colors.white,
        letterSpacing: 0.5,
    },
});

export default ProductDetailsScreen;
