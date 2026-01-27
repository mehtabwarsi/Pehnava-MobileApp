import React, { useState } from "react";
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    FlatList
} from "react-native";
import { theme } from "../../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "../../components/Header/HomeHeader";
import Catalog from "../../components/Catalog/CataLog";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";
import ProductCard from "../../components/Product/ProductCard";
import LinearGradient from "react-native-linear-gradient";
import PromoCard from "../../components/Card/PromoCard";
import TrendingCard from "../../components/Card/TrendingCard";
import { useGetAllProducts } from "../../Services/PublicApi/useApiPublicHook";

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
    const { data, isLoading } = useGetAllProducts();

    const products = data?.data;
    console.log("products", products);

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
                {/* 2. Promo Card */}
                <PromoCard
                    offPrice="₹500 OFF"
                    description="ON YOUR FIRST PURCHASE"
                    code="PEHNAVA500"
                    onPress={() => console.log('Promo Card Pressed')}
                />

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
                    <TrendingCard
                        title="Men's Luxe"
                        subtitle="NEW IN"
                        image="https://images.unsplash.com/photo-1621335829175-95f437384d7c"
                        buttonText="EXPLORE"
                        onPress={() => console.log('New in banner pressed')}
                    />
                    <TrendingCard
                        title="Floral Edit"
                        subtitle="TRENDING"
                        image="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1"
                        buttonText="SHOP NOW"
                        onPress={() => console.log('Trending banner pressed')}
                    />
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
                    >
                        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)']} style={styles.storyOverlay}>
                            <View style={styles.storyTextContainer}>
                                <Text style={styles.storyOverline}>THE CRAFT</Text>
                                <Text style={styles.storyTitle}>Woven with Heritage</Text>
                                <Text style={styles.storyDesc}>
                                    Each piece in our boutique is a testament to India's rich artisanal legacy,
                                    brought to life with modern elegance.
                                </Text>
                                <TouchableOpacity style={styles.storyBtn} activeOpacity={0.8}>
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

                    <FlatList
                        data={products}
                        renderItem={({ item }) => (
                            <ProductCard
                                id={item._id}
                                slug={item.slug}
                                title={item.name}
                                price={item.price}
                                image={item?.images[0]}
                                containerStyle={{ width: (SCREEN_WIDTH - 40 - 12) / 2 }}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        scrollEnabled={false}
                        columnWrapperStyle={{ columnGap: 12 }}
                    />

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
    catalogSection: {
        marginTop: 8,
    },
    dualBanners: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        gap: 12,
        marginTop: 24,
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
    gridItem: {
        width: '48%',
        marginBottom: 20,
    },

    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 4,
    },

});

export default HomeScreen;