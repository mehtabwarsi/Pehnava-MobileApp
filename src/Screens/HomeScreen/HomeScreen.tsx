import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Dimensions, ImageBackground } from "react-native";
import { theme } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/Header/HomeHeader";
import Catalog from "../../components/Catalog/CataLog";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import ProductCard from "../../components/Product/ProductCard";
import Icon from "react-native-vector-icons/Ionicons";
import LinearGradient from "react-native-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MOCK_CATEGORIES_MEN = [
    {
        _id: '1',
        title: 'Premium Shirts',
        subtitle: '120+',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600&auto=format&fit=crop',
        gender: 'Men',
    },
    {
        _id: '2',
        title: 'Denim Jeans',
        subtitle: '85+',
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop',
        gender: 'Men',
    },
];

const MOCK_CATEGORIES_WOMEN = [
    {
        _id: '4',
        title: 'Summer Dresses',
        subtitle: '150+',
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop',
        gender: 'Women',
    },
    {
        _id: '5',
        title: 'Elegant Sarees',
        subtitle: '200+',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
        gender: 'Women',
    },
];

const MOCK_TRENDING = [
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
];

const MOCK_PRODUCTS = [
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

const HomeScreen = () => {
    const [activeCategory, setActiveCategory] = useState<'Men' | 'Women' | 'All'>('All');

    return (
        <SafeAreaView style={styles.safeArea}>
            <HomeHeader
                activeTab={activeCategory}
                onTabChange={setActiveCategory}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* 1. Hero Carousel */}
                <HomeCarousel />

                {/* 2. New: Promotional Offer Strip */}
                <TouchableOpacity style={styles.promoStrip} activeOpacity={0.9}>
                    <LinearGradient
                        colors={[theme.colors.charcoal, '#2C3E50']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.promoGradient}
                    >
                        <View style={styles.promoContent}>
                            <View style={styles.promoIconTag}>
                                <Icon name="flash" size={12} color={theme.colors.white} />
                            </View>
                            <Text style={styles.promoText}>
                                FLAT <Text style={styles.promoBold}>₹500 OFF</Text> ON YOUR FIRST PURCHASE
                            </Text>
                            <Text style={styles.promoCode}>CODE: PEHNAVA500</Text>
                        </View>
                        <Icon name="arrow-forward-circle" size={24} color="rgba(255,255,255,0.3)" />
                    </LinearGradient>
                </TouchableOpacity>

                {/* 3. Catalog Section */}
                <View style={styles.catalogSection}>
                    <Catalog
                        title="The Collection"
                        gender={activeCategory === 'All' ? undefined : activeCategory}
                        description="Cinematic designs that tell a story of elegance."
                        categories={activeCategory === 'Men' ? MOCK_CATEGORIES_MEN : MOCK_CATEGORIES_WOMEN}
                    />
                </View>

                {/* 4. New: Dual Visual Banners */}
                <View style={styles.dualBanners}>
                    <TouchableOpacity style={styles.dualBannerBox} activeOpacity={0.9}>
                        <ImageBackground
                            source={{ uri: 'https://images.unsplash.com/photo-1621335829175-95f437384d7c' }}
                            style={styles.dualBannerImg}
                            imageStyle={styles.roundedImg}
                        >
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.dualGradient}>
                                <Text style={styles.dualTag}>NEW IN</Text>
                                <Text style={styles.dualTitle}>Men's Luxe</Text>
                                <Text style={styles.dualAction}>EXPLORE</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dualBannerBox} activeOpacity={0.9}>
                        <ImageBackground
                            source={{ uri: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1' }}
                            style={styles.dualBannerImg}
                            imageStyle={styles.roundedImg}
                        >
                            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.dualGradient}>
                                <Text style={styles.dualTag}>TRENDING</Text>
                                <Text style={styles.dualTitle}>Floral Edit</Text>
                                <Text style={styles.dualAction}>SHOP NOW</Text>
                            </LinearGradient>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                {/* 5. Trending Section */}
                <View style={[styles.section, styles.trendingSection]}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>TRENDING NOW</Text>
                            <Text style={styles.sectionSubtitle}>Most loved by our community</Text>
                        </View>
                        <TouchableOpacity style={styles.viewAllBtn}>
                            <Text style={styles.viewAllText}>VIEW ALL</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trendingReel}>
                        {MOCK_TRENDING.map((product) => (
                            <View key={product.id} style={styles.trendingCard}>
                                <ProductCard {...product} />
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* 6. New: Brand Story Banner */}
                <TouchableOpacity style={styles.storyBanner} activeOpacity={0.9}>
                    <ImageBackground
                        source={{ uri: 'https://i.pinimg.com/736x/e2/fc/d2/e2fcd2f2ce941d8aeb3980a55a16c819.jpg' }}
                        style={styles.storyImg}
                        imageStyle={styles.roundedImg}
                    >
                        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.storyOverlay}>
                            <View style={styles.storyTextContainer}>
                                <Text style={styles.storyOverline}>THE CRAFT</Text>
                                <Text style={styles.storyTitle}>Woven with Heritage</Text>
                                <Text style={styles.storyDesc}>
                                    Each piece in our boutique is a testament to India's rich artisanal legacy,
                                    brought to life with modern elegance.
                                </Text>
                                <TouchableOpacity style={styles.storyBtn}>
                                    <Text style={styles.storyBtnText}>OUR STORY</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                </TouchableOpacity>

                {/* 7. Grid Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>MUST HAVES</Text>
                            <Text style={styles.sectionSubtitle}>Essential boutique pieces</Text>
                        </View>
                    </View>

                    <View style={styles.productGrid}>
                        {MOCK_PRODUCTS.map((product) => (
                            <View key={product.id} style={styles.gridItem}>
                                <ProductCard {...product} />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // backgroundColor: theme.colors.white,
        backgroundColor: '#F8F9FA'
    },
    scrollContent: {
        paddingBottom: 20,
    },
    promoStrip: {
        marginHorizontal: 20,
        marginVertical: 16,
        borderRadius: 12,
        overflow: 'hidden',
    },
    promoGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    promoIconTag: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    promoContent: {
        flex: 1,
    },
    promoText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    promoBold: {
        color: theme.colors.white,
        fontWeight: '900',
        fontSize: 12,
    },
    promoCode: {
        color: theme.colors.white,
        fontSize: 13,
        fontWeight: '800',
        marginTop: 2,
        letterSpacing: 1,
    },
    catalogSection: {
        marginTop: 8,
    },
    dualBanners: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginTop: 24,
    },
    dualBannerBox: {
        flex: 1,
        height: 200,
    },
    dualBannerImg: {
        flex: 1,
    },
    roundedImg: {
        borderRadius: 12,
    },
    dualGradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 12,
        borderRadius: 12,
    },
    dualTag: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 1,
        marginBottom: 4,
    },
    dualTitle: {
        color: theme.colors.white,
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 8,
    },
    dualAction: {
        color: theme.colors.white,
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 1,
        textDecorationLine: 'underline',
    },
    section: {
        marginTop: 32,
        paddingHorizontal: 20,
    },
    trendingSection: {
        paddingHorizontal: 0,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '900',
        color: theme.colors.charcoal,
        letterSpacing: 2,
    },
    sectionSubtitle: {
        fontSize: 11,
        color: theme.colors.slate,
        marginTop: 4,
        fontWeight: '500',
    },
    viewAllBtn: {
        paddingVertical: 4,
    },
    viewAllText: {
        fontSize: 11,
        fontWeight: '800',
        color: theme.colors.primary,
        letterSpacing: 1,
    },
    trendingReel: {
        paddingLeft: 20,
        paddingRight: 8,
        paddingBottom: 4,
    },
    trendingCard: {
        width: SCREEN_WIDTH * 0.45,
        marginRight: 16,
    },
    storyBanner: {
        marginHorizontal: 20,
        marginTop: 40,
        height: 320,
    },
    storyImg: {
        flex: 1,
    },
    storyOverlay: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        borderRadius: 12,
    },
    storyTextContainer: {
        alignItems: 'center',
    },
    storyOverline: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '900',
        letterSpacing: 2,
        marginBottom: 12,
    },
    storyTitle: {
        color: theme.colors.white,
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12,
    },
    storyDesc: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    storyBtn: {
        backgroundColor: theme.colors.white,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    storyBtnText: {
        color: theme.colors.charcoal,
        fontSize: 12,
        fontWeight: '800',
        letterSpacing: 1,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    gridItem: {
        width: '48%',
        marginBottom: 20,
    },
});

export default HomeScreen;