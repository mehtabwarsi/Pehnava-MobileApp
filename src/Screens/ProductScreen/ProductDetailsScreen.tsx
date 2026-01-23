import React, { useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header/Header";

const { width } = Dimensions.get("window");

const images = [
    "https://images.unsplash.com/photo-1621335829175-95f437384d7c",
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1",
    "https://i.pinimg.com/736x/b9/2f/f5/b92ff5d2013e43589349109e09f7955f.jpg",
];

// ===== INDICATOR CONFIG =====
const TRACK_WIDTH = 120;
const TRACK_PADDING = 8;

const ProductDetailsScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const thumbWidth =
        (TRACK_WIDTH - TRACK_PADDING * 2) / images.length;

    const translateX = scrollX.interpolate({
        inputRange: [0, width * (images.length - 1)],
        outputRange: [
            TRACK_PADDING,
            TRACK_WIDTH - thumbWidth - TRACK_PADDING,
        ],
        extrapolate: "clamp",
    });

    return (
        <SafeAreaView style={styles.container}>
            <Header
                title="Product Details"
                showShare
                showWishlist
                showCart
                cartItemCount={2}
            />

            {/* IMAGE CAROUSEL */}
            <View style={styles.carouselContainer}>
                <Animated.FlatList
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
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
            </View>
        </SafeAreaView>
    );
};

export default ProductDetailsScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    carouselContainer: {
        position: "relative",
    },

    image: {
        width,
        height: 450,
        resizeMode: "cover",
    },

    /* SCROLLBAR TRACK */
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

    /* SCROLLBAR THUMB */
    scrollBarThumb: {
        height: 4,
        backgroundColor: "#fff",
        borderRadius: 4,
    },
});

