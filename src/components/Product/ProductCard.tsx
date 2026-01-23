import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../theme/theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Navigation/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40) / 2; // Adjusted for better 2-column spacing


interface ProductCardProps {
    id: string | number;
    slug: string;
    title: string;
    price: number;
    image?: string;
    originalPrice?: number;
    rating?: number;
    isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    slug,
    title,
    price,
    image,
    originalPrice,
    rating = 4.5,
    isNew = false,
}) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handlePress = () => {
        console.log("Product Pressed");
    };

    const handleWishlist = () => {
        setIsFavorited(!isFavorited);
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            {/* Image Container */}
            <View style={styles.imageContainer}>
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.noImage}>
                        <Icon name="image-outline" size={24} color={theme.colors.slate} />
                        <Text style={styles.noImageText}>No Preview</Text>
                    </View>
                )}

                {/* Badges */}
                <View style={styles.badgeContainer}>
                    {isNew && (
                        <View style={[styles.badge, styles.newBadge]}>
                            <Text style={styles.badgeText}>NEW</Text>
                        </View>
                    )}
                </View>

            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.mainContent}>
                    <View style={styles.ratingRow}>
                        <Icon name="star" size={10} color="#FFB800" />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>

                    <Text style={styles.title} numberOfLines={1}>
                        {title}
                    </Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{price.toLocaleString("en-IN")}</Text>
                        {originalPrice && (
                            <Text style={styles.originalPrice}>₹{originalPrice.toLocaleString("en-IN")}</Text>
                        )}
                    </View>
                </View>

                {/* Wishlist Button - Bottom Position */}
                <TouchableOpacity
                    style={styles.wishlistButton}
                    onPress={handleWishlist}
                    activeOpacity={0.7}
                >
                    <Icon
                        name={isFavorited ? "heart" : "heart-outline"}
                        size={18}
                        color={isFavorited ? theme.colors.accent : theme.colors.charcoal}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        // backgroundColor: theme.colors.white,
        borderRadius: 5,
        marginBottom: 16,
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 3 / 4, // More premium portrait ratio
        backgroundColor: theme.colors.lightGray,
        overflow: "hidden",
        position: "relative",
        borderRadius: 10
    },
    image: {
        width: "100%",
        height: "100%",
    },
    noImage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    noImageText: {
        color: theme.colors.slate,
        fontSize: 10,
        fontWeight: "500",
    },
    badgeContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        gap: 6,
    },
    badge: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 4,
    },
    newBadge: {
        backgroundColor: theme.colors.primary,
    },
    badgeText: {
        color: theme.colors.white,
        fontSize: 8,
        fontWeight: "800",
        letterSpacing: 0.5,
    },
    wishlistButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.offWhite + "80",
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: 10,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    mainContent: {
        flex: 1,
        marginRight: 8,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginBottom: 2,
    },
    ratingText: {
        fontSize: 10,
        fontWeight: "600",
        color: theme.colors.slate,
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        color: theme.colors.charcoal,
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    price: {
        fontSize: 15,
        fontWeight: "700",
        color: theme.colors.charcoal,
    },
    originalPrice: {
        fontSize: 11,
        color: theme.colors.slate,
        textDecorationLine: "line-through",
        opacity: 0.6,
    },
});

export default ProductCard;
