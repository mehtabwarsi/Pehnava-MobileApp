import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/Header";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../theme/theme";
import ProductCard from "../../components/Product/ProductCard";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/types";
import { useGetProductById } from "../../Services/PublicApi/useApiPublicHook";

const { width } = Dimensions.get("window");

const images = [
    "https://images.unsplash.com/photo-1621335829175-95f437384d7c",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    "https://i.pinimg.com/736x/b9/2f/f5/b92ff5d2013e43589349109e09f7955f.jpg",
];

// Mock data
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
    { name: "Black", hex: "#000000" },
    { name: "Navy", hex: "#1E3A8A" },
    { name: "Maroon", hex: "#7F1D1D" },
    { name: "Olive", hex: "#3F6212" },
];

const MOCK_REVIEWS = [
    {
        id: "1",
        name: "Priya Sharma",
        rating: 5,
        comment: "Excellent quality! The fabric is premium and fits perfectly.",
        date: "2 days ago",
    },
    {
        id: "2",
        name: "Rahul Verma",
        rating: 4,
        comment: "Great product, fast delivery. Slightly different color than shown.",
        date: "1 week ago",
    },
];

const SIMILAR_PRODUCTS = [
    {
        id: "5",
        slug: "similar-kurta-1",
        title: "Designer Kurta Set",
        price: 2499,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
        isNew: true,
        rating: 4.5,
    },
    {
        id: "6",
        slug: "similar-kurta-2",
        title: "Ethnic Wear",
        price: 1999,
        originalPrice: 3499,
        image: "https://i.pinimg.com/736x/b9/2f/f5/b92ff5d2013e43589349109e09f7955f.jpg",
        isNew: false,
        rating: 4.2,
    },
];

// ===== INDICATOR CONFIG =====
const TRACK_WIDTH = 120;
const TRACK_PADDING = 8;

const ProductDetailsScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);

    const route = useRoute<RouteProp<RootStackParamList, "ProductDetails">>();
    const { id } = route.params;
    const { data } = useGetProductById(id);
    const product = data?.data;

    // Safely access variants - default to empty array if undefined
    const variants = product?.variants || [];

    // Derived Data
    // 1. Unique Sizes
    const uniqueSizes = React.useMemo(() => {
        if (!variants || variants.length === 0) return [];
        const sizes = [...new Set(variants.map((v: any) => v.size))];
        // Sort sizes logic
        const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "28", "30", "32", "34", "36", "38"];
        return sizes.sort((a: any, b: any) => {
            const indexA = sizeOrder.indexOf(a);
            const indexB = sizeOrder.indexOf(b);
            // If both are found in order list
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            // If only A is found
            if (indexA !== -1) return -1;
            // If only B is found
            if (indexB !== -1) return 1;
            // Fallback to string comparison
            return String(a).localeCompare(String(b));
        });
    }, [variants]);

    // 2. Unique Colors with Hex
    const getColorHex = (name: string) => {
        const lowerName = name?.toLowerCase() || '';
        switch (lowerName) {
            case 'white': return '#FFFFFF';
            case 'black': return '#000000';
            case 'blue': return '#1E3A8A';
            case 'navy': return '#0F172A';
            case 'red': return '#DC2626';
            case 'maroon': return '#7F1D1D';
            case 'green': return '#16A34A';
            case 'olive': return '#3F6212';
            case 'yellow': return '#CA8A04';
            case 'pink': return '#DB2777';
            case 'grey':
            case 'gray': return '#808080';
            default: return '#CCCCCC';
        }
    };

    const uniqueColors = React.useMemo(() => {
        if (!variants || variants.length === 0) return [];
        const colors = [...new Set(variants.map((v: any) => v.color))]; // Filter unique color names
        return colors.map((color: any) => ({
            name: color,
            hex: getColorHex(color)
        }));
    }, [variants]);

    // Initialize state
    React.useEffect(() => {
        if (uniqueSizes.length > 0 && (!selectedSize || !uniqueSizes.includes(selectedSize))) {
            setSelectedSize(String(uniqueSizes[0]));
        }
        if (uniqueColors.length > 0) {
            const foundColor = uniqueColors.find(c => c.name === selectedColor.name);
            if (!foundColor) {
                setSelectedColor(uniqueColors[0]);
            }
        }
    }, [uniqueSizes, uniqueColors, selectedSize, selectedColor.name]);

    const productImages = product?.images && product.images.length > 0 ? product.images : ["https://placehold.co/600x400/png"];
    // console.log(productImages)
    const thumbWidth = (TRACK_WIDTH - TRACK_PADDING * 2) / productImages.length;

    const translateX = scrollX.interpolate({
        inputRange: [0, width * (productImages.length - 1)],
        outputRange: [
            TRACK_PADDING,
            TRACK_WIDTH - thumbWidth - TRACK_PADDING,
        ],
        extrapolate: "clamp",
    });

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title={product?.name}
                showShare
                showWishlist
                showCart
                cartItemCount={2}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* IMAGE CAROUSEL */}
                <View style={styles.carouselContainer}>
                    <Animated.FlatList
                        key={productImages.length}
                        data={productImages}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        scrollEventThrottle={16}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false } // ✔ correct
                        )}
                        renderItem={({ item }) => {
                            console.log(item)
                            return (
                                <View style={{ width, height: 450 }}>
                                    <Image source={{ uri: item }} style={styles.image} />
                                </View>
                            )
                        }}
                    />

                    {/* SYSTEM-LIKE INDICATOR */}
                    <View style={styles.scrollBarTrack}>
                        <Animated.View
                            style={[
                                styles.scrollBarThumb,
                                {
                                    width: thumbWidth,
                                    transform: [{ translateX }],
                                },
                            ]}
                        />
                    </View>

                    {/* Wishlist Floating Button */}
                    <TouchableOpacity
                        style={styles.wishlistFloat}
                        onPress={() => setIsFavorited(!isFavorited)}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name={isFavorited ? "heart" : "heart-outline"}
                            size={24}
                            color={isFavorited ? theme.colors.accent : theme.colors.charcoal}
                        />
                    </TouchableOpacity>
                </View>

                {/* PRODUCT INFO */}
                <View style={styles.productInfo}>
                    <View style={styles.brandRow}>
                        <Text style={styles.brandName}>PEHNAVA</Text>
                        <View style={styles.ratingBadge}>
                            <Icon name="star" size={12} color="#FFB800" />
                            <Text style={styles.ratingText}>4.6</Text>
                            <Text style={styles.reviewCount}>(248)</Text>
                        </View>
                    </View>

                    <Text style={styles.productTitle}>
                        {product?.name}
                    </Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{product?.discountPrice}</Text>
                        <Text style={styles.originalPrice}>₹{product?.price}</Text>
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>50% OFF</Text>
                        </View>
                    </View>

                    <Text style={styles.taxText}>inclusive of all taxes</Text>
                </View>

                {/* COLOR SELECTOR */}
                <View style={styles.selectorSection}>
                    <Text style={styles.selectorLabel}>
                        COLOR: <Text style={styles.selectorValue}>{selectedColor.name.toUpperCase()}</Text>
                    </Text>
                    <View style={styles.colorGrid}>
                        {uniqueColors.map((color) => (
                            <TouchableOpacity
                                key={color.name}
                                style={[
                                    styles.colorOption,
                                    selectedColor.name === color.name && styles.colorOptionSelected,
                                ]}
                                onPress={() => setSelectedColor(color)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color.hex },
                                    ]}
                                />
                                {selectedColor.name === color.name && (
                                    <Icon
                                        name="checkmark"
                                        size={12}
                                        color={theme.colors.primary}
                                        style={styles.colorCheck}
                                    />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* SIZE SELECTOR */}
                <View style={styles.selectorSection}>
                    <View style={styles.selectorHeader}>
                        <Text style={styles.selectorLabel}>
                            SIZE: <Text style={styles.selectorValue}>{selectedSize.toUpperCase()}</Text>
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.sizeGuideLink}>SIZE GUIDE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sizeGrid}>
                        {uniqueSizes.map((size) => {
                            // Calculate stock for this size
                            const sizeVariants = variants.filter((v: any) => v.size === String(size));
                            const totalStock = sizeVariants.reduce((acc: number, v: any) => acc + (v.stock || 0), 0);
                            const isOutOfStock = totalStock === 0;

                            return (
                                <View key={String(size)} style={{ alignItems: 'center', gap: 4 }}>
                                    <TouchableOpacity
                                        disabled={isOutOfStock}
                                        style={[
                                            styles.sizeOption,
                                            selectedSize === String(size) && styles.sizeOptionSelected,
                                            isOutOfStock && styles.sizeOptionDisabled
                                        ]}
                                        onPress={() => {
                                            setSelectedSize(String(size));
                                            const firstAvailableVariant = sizeVariants.find((v: any) => (v.stock || 0) > 0);
                                            if (firstAvailableVariant) {
                                                const matchingColor = uniqueColors.find(c => c.name === firstAvailableVariant.color);
                                                if (matchingColor) setSelectedColor(matchingColor);
                                            }
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Text
                                            style={[
                                                styles.sizeText,
                                                selectedSize === String(size) && styles.sizeTextSelected,
                                                isOutOfStock && styles.sizeTextDisabled
                                            ]}
                                        >
                                            {String(size).toUpperCase()}
                                        </Text>
                                        {isOutOfStock && (
                                            <View style={styles.diagonalLine} />
                                        )}
                                    </TouchableOpacity>
                                    {!isOutOfStock && totalStock < 11 && (
                                        <Text style={styles.lowStockText}>
                                            {totalStock} left
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* PRODUCT DETAILS - EXPANDABLE */}
                <View style={styles.expandableSection}>
                    <TouchableOpacity
                        style={styles.expandableHeader}
                        onPress={() => toggleSection("details")}
                        activeOpacity={0.7}
                    >
                        <View style={styles.expandableHeaderLeft}>
                            <Icon name="list-outline" size={20} color={theme.colors.charcoal} />
                            <Text style={styles.expandableTitle}>Product Details</Text>
                        </View>
                        <Icon
                            name={expandedSection === "details" ? "chevron-up" : "chevron-down"}
                            size={20}
                            color={theme.colors.slate}
                        />
                    </TouchableOpacity>
                    {expandedSection === "details" && (
                        <View style={styles.expandableContent}>
                            <Text style={styles.detailText}>
                                {product?.description}
                            </Text>

                            <Text style={[styles.expandableTitle, { fontSize: 13, marginBottom: 8, marginTop: 8 }]}>Features</Text>
                            <View style={styles.detailList}>
                                {product?.features?.map((feature: any, index: number) => (
                                    <Text key={index} style={styles.detailItem}>• {feature}</Text>
                                ))}
                            </View>

                            <Text style={[styles.expandableTitle, { fontSize: 13, marginBottom: 8, marginTop: 16 }]}>Specifications</Text>
                            <View style={styles.detailList}>
                                {Object.entries(product?.specifications || {}).map(([key, value]: any) => (
                                    <View key={key} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <Text style={[styles.detailItem, { fontWeight: '600', textTransform: 'capitalize' }]}>{key}:</Text>
                                        <Text style={[styles.detailItem, { textTransform: 'capitalize' }]}>{value}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>

                {/* DELIVERY & RETURNS */}
                <View style={styles.expandableSection}>
                    <TouchableOpacity
                        style={styles.expandableHeader}
                        onPress={() => toggleSection("delivery")}
                        activeOpacity={0.7}
                    >
                        <View style={styles.expandableHeaderLeft}>
                            <Icon name="cube-outline" size={20} color={theme.colors.charcoal} />
                            <Text style={styles.expandableTitle}>Delivery & Returns</Text>
                        </View>
                        <Icon
                            name={expandedSection === "delivery" ? "chevron-up" : "chevron-down"}
                            size={20}
                            color={theme.colors.slate}
                        />
                    </TouchableOpacity>
                    {expandedSection === "delivery" && (
                        <View style={styles.expandableContent}>
                            <View style={styles.deliveryInfo}>
                                <Icon name="flash-outline" size={18} color={theme.colors.primary} />
                                <Text style={styles.deliveryText}>
                                    Get it by <Text style={styles.deliveryBold}>Tomorrow</Text>
                                </Text>
                            </View>
                            <View style={styles.deliveryInfo}>
                                <Icon name="refresh-outline" size={18} color={theme.colors.secondary} />
                                <Text style={styles.deliveryText}>
                                    <Text style={styles.deliveryBold}>14 days</Text> return & exchange
                                </Text>
                            </View>
                            <View style={styles.deliveryInfo}>
                                <Icon name="shield-checkmark-outline" size={18} color={theme.colors.accent} />
                                <Text style={styles.deliveryText}>100% Original Products</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* REVIEWS */}
                <View style={styles.expandableSection}>
                    <TouchableOpacity
                        style={styles.expandableHeader}
                        onPress={() => toggleSection("reviews")}
                        activeOpacity={0.7}
                    >
                        <View style={styles.expandableHeaderLeft}>
                            <Icon name="star-outline" size={20} color={theme.colors.charcoal} />
                            <Text style={styles.expandableTitle}>
                                Reviews ({MOCK_REVIEWS.length})
                            </Text>
                        </View>
                        <Icon
                            name={expandedSection === "reviews" ? "chevron-up" : "chevron-down"}
                            size={20}
                            color={theme.colors.slate}
                        />
                    </TouchableOpacity>
                    {expandedSection === "reviews" && (
                        <View style={styles.expandableContent}>
                            {MOCK_REVIEWS.map((review) => (
                                <View key={review.id} style={styles.reviewCard}>
                                    <View style={styles.reviewHeader}>
                                        <View style={styles.reviewerInfo}>
                                            <View style={styles.reviewerAvatar}>
                                                <Text style={styles.reviewerInitial}>
                                                    {review.name.charAt(0)}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={styles.reviewerName}>{review.name}</Text>
                                                <View style={styles.reviewRating}>
                                                    {[...Array(5)].map((_, i) => (
                                                        <Icon
                                                            key={i}
                                                            name="star"
                                                            size={10}
                                                            color={i < review.rating ? "#FFB800" : theme.colors.border}
                                                        />
                                                    ))}
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={styles.reviewDate}>{review.date}</Text>
                                    </View>
                                    <Text style={styles.reviewComment}>{review.comment}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* SIMILAR PRODUCTS */}
                <View style={styles.similarSection}>
                    <Text style={styles.similarTitle}>YOU MAY ALSO LIKE</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.similarScroll}
                    >
                        {SIMILAR_PRODUCTS.map((product) => (
                            <View key={product.id} style={styles.similarCard}>
                                <ProductCard {...product} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Bottom Spacer for sticky button */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* STICKY BOTTOM BAR */}
            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={styles.addToBagButton}
                    activeOpacity={0.8}
                >
                    <Icon name="bag-outline" size={20} color={theme.colors.white} />
                    <Text style={styles.addToBagText}>ADD TO BAG</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    scrollContent: {
        paddingBottom: 20,
    },
    carouselContainer: {
        position: "relative",
    },
    image: {
        width,
        height: 450,
        resizeMode: "cover",
    },
    scrollBarTrack: {
        position: "absolute",
        bottom: 14,
        width: TRACK_WIDTH,
        height: 4,
        backgroundColor: "rgba(0,0,0,0.2)",
        borderRadius: 4,
        alignSelf: "center",
        overflow: "hidden",
    },
    scrollBarThumb: {
        height: 4,
        backgroundColor: "#fff",
        borderRadius: 4,
    },
    wishlistFloat: {
        position: "absolute",
        top: 16,
        right: 16,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.white,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
    },

    // Product Info
    productInfo: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    brandRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    brandName: {
        fontSize: 11,
        fontWeight: "800",
        color: theme.colors.primary,
        letterSpacing: 1.5,
    },
    ratingBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.lightGray,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    ratingText: {
        fontSize: 11,
        fontWeight: "700",
        color: theme.colors.charcoal,
    },
    reviewCount: {
        fontSize: 10,
        color: theme.colors.slate,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: theme.colors.charcoal,
        marginBottom: 12,
        lineHeight: 24,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 4,
    },
    price: {
        fontSize: 22,
        fontWeight: "800",
        color: theme.colors.charcoal,
    },
    originalPrice: {
        fontSize: 16,
        color: theme.colors.slate,
        textDecorationLine: "line-through",
    },
    discountBadge: {
        backgroundColor: theme.colors.accent + "15",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    discountText: {
        fontSize: 11,
        fontWeight: "800",
        color: theme.colors.accent,
    },
    taxText: {
        fontSize: 11,
        color: theme.colors.slate,
        fontStyle: "italic",
    },

    // Selectors
    selectorSection: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    selectorHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    selectorLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: theme.colors.charcoal,
        letterSpacing: 0.5,
        marginBottom: 12,
    },
    selectorValue: {
        color: theme.colors.primary,

    },
    sizeGuideLink: {
        fontSize: 11,
        fontWeight: "700",
        color: theme.colors.primary,
        textDecorationLine: "underline",
        textTransform: 'capitalize'
    },

    // Color Selector
    colorGrid: {
        flexDirection: "row",
        gap: 12,
    },
    colorOption: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    colorOptionSelected: {
        borderColor: theme.colors.primary,
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    colorCheck: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: theme.colors.white,
        borderRadius: 10,
    },

    // Size Selector
    sizeGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    sizeOption: {
        minWidth: 50,
        paddingHorizontal: 12,
        height: 44,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: theme.colors.border,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.white,
    },
    sizeOptionSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + "10",
    },
    sizeText: {
        fontSize: 13,
        fontWeight: "600",
        color: theme.colors.charcoal,
        textTransform: 'uppercase'

    },
    sizeTextSelected: {
        color: theme.colors.primary,
        fontWeight: "800",
        textTransform: 'uppercase'
    },
    sizeOptionDisabled: {
        backgroundColor: '#F3F4F6', // light gray
        borderColor: '#E5E7EB',
    },
    sizeTextDisabled: {
        color: '#9CA3AF', // gray 400
        textDecorationLine: 'line-through',
    },
    diagonalLine: {
        position: 'absolute',
        width: '120%',
        height: 1,
        backgroundColor: '#D1D5DB',
        transform: [{ rotate: '-45deg' }],
    },
    lowStockText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#D97706', // amber 600
    },

    // Expandable Sections
    expandableSection: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    expandableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    expandableHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    expandableTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: theme.colors.charcoal,
    },
    expandableContent: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },

    // Product Details
    detailText: {
        fontSize: 13,
        color: theme.colors.darkSlate,
        lineHeight: 20,
        marginBottom: 12,
    },
    detailList: {
        gap: 6,
    },
    detailItem: {
        fontSize: 13,
        color: theme.colors.charcoal,
        lineHeight: 20,
    },

    // Delivery Info
    deliveryInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },
    deliveryText: {
        fontSize: 13,
        color: theme.colors.darkSlate,
    },
    deliveryBold: {
        fontWeight: "700",
        color: theme.colors.charcoal,
    },

    // Reviews
    reviewCard: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    reviewHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 8,
    },
    reviewerInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    reviewerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primary + "20",
        justifyContent: "center",
        alignItems: "center",
    },
    reviewerInitial: {
        fontSize: 14,
        fontWeight: "700",
        color: theme.colors.primary,
    },
    reviewerName: {
        fontSize: 13,
        fontWeight: "600",
        color: theme.colors.charcoal,
        marginBottom: 2,
    },
    reviewRating: {
        flexDirection: "row",
        gap: 2,
    },
    reviewDate: {
        fontSize: 11,
        color: theme.colors.slate,
    },
    reviewComment: {
        fontSize: 13,
        color: theme.colors.darkSlate,
        lineHeight: 18,
    },

    // Similar Products
    similarSection: {
        marginTop: 24,
        paddingBottom: 16,
    },
    similarTitle: {
        fontSize: 13,
        fontWeight: "900",
        color: theme.colors.charcoal,
        letterSpacing: 1.5,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    similarScroll: {
        paddingLeft: 20,
        paddingRight: 8,
    },
    similarCard: {
        width: width * 0.45,
        marginRight: 16,
    },

    // Bottom Bar
    bottomBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    addToBagButton: {
        flexDirection: "row",
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    addToBagText: {
        fontSize: 14,
        fontWeight: "800",
        color: theme.colors.white,
        letterSpacing: 1,
    },
});

