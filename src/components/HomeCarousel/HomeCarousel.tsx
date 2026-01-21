import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    ImageBackground,
    TouchableOpacity,
    NativeSyntheticEvent,
    NativeScrollEvent
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../theme/theme";

const { width } = Dimensions.get("window");

const slides = [
    {
        id: "1",
        title: "Pehnava",
        subtitle: "Your Style, Your Identity",
        description: "Discover exquisite traditional wear crafted with precision and elegance",
        image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    },
    {
        id: "2",
        title: "Ethnic & Modern Wear",
        subtitle: "Made for India",
        description: "Where tradition meets contemporary fashion",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    },
    {
        id: "3",
        title: "New Collection",
        subtitle: "Discover the Latest",
        description: "Exclusive designs that celebrate your heritage",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
    },
];

const HomeCarousel = () => {
    const [current, setCurrent] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (current + 1) % slides.length;
            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setCurrent(nextIndex);
        }, 5000);

        return () => clearInterval(interval);
    }, [current]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        if (index !== current) {
            setCurrent(index);
        }
    };

    const renderItem = ({ item }: { item: typeof slides[0] }) => (
        <View style={styles.slide}>
            <ImageBackground source={{ uri: item.image }} style={styles.imageBackground}>
                <LinearGradient
                    colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
                    style={styles.gradient}
                >
                    <View style={styles.contentContainer}>
                        <Text style={styles.subtitle}>{item.subtitle}</Text>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={styles.primaryButton}>
                                <Text style={styles.primaryButtonText}>Shop Collection</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.secondaryButton}>
                                <Text style={styles.secondaryButtonText}>Learn More</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>500+</Text>
                                <Text style={styles.statLabel}>Products</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>10K+</Text>
                                <Text style={styles.statLabel}>Happy Customers</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>4.9★</Text>
                                <Text style={styles.statLabel}>Rating</Text>
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item) => item.id}
                scrollEventThrottle={16}
            />

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === current ? styles.activeDot : styles.inactiveDot
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 500,
        backgroundColor: theme.colors.lightGray,
    },
    slide: {
        width: width,
        height: 500,
    },
    imageBackground: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: 60,
        paddingHorizontal: 20,
    },
    contentContainer: {
        gap: 8,
    },
    subtitle: {
        color: theme.colors.white,
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "uppercase",
        opacity: 0.9,
    },
    title: {
        color: theme.colors.white,
        fontSize: 42,
        fontWeight: "bold",
        lineHeight: 48,
    },
    description: {
        color: theme.colors.white,
        fontSize: 16,
        lineHeight: 24,
        opacity: 0.8,
        maxWidth: "90%",
    },
    buttonRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
    primaryButtonText: {
        color: theme.colors.charcoal,
        fontWeight: "bold",
        fontSize: 14,
    },
    secondaryButton: {
        backgroundColor: "rgba(255,255,255,0.15)",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
    },
    secondaryButtonText: {
        color: theme.colors.white,
        fontWeight: "600",
        fontSize: 14,
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        gap: 15,
    },
    statItem: {
        alignItems: "flex-start",
    },
    statValue: {
        color: theme.colors.white,
        fontSize: 20,
        fontWeight: "bold",
    },
    statLabel: {
        color: theme.colors.white,
        fontSize: 10,
        opacity: 0.7,
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: "rgba(255,255,255,0.3)",
    },
    paginationContainer: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        width: 24,
        backgroundColor: theme.colors.white,
    },
    inactiveDot: {
        width: 6,
        backgroundColor: "rgba(255,255,255,0.4)",
    },
});

export default HomeCarousel;
